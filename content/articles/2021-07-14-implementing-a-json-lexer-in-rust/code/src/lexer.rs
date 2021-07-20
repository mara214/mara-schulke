use std::iter::Peekable;

use crate::tokens::*;
use crate::types::*;

#[derive(Clone, Debug, PartialEq)]
pub enum Error {
    UnexpectedEOF,
    UnknownChar,
    InvalidNumberFormat,
    InvalidExponentFormat,
}

type Result<T> = std::result::Result<T, Error>;

#[derive(Debug)]
pub struct Lexer<I: Iterator<Item = char>> {
    source: Peekable<I>,
}

impl<I> From<I> for Lexer<I>
where
    I: Iterator<Item = char>,
{
    fn from(source: I) -> Self {
        Lexer {
            source: source.peekable(),
        }
    }
}

impl<I> Iterator for Lexer<I>
where
    I: Iterator<Item = char>,
{
    type Item = Result<Token>;

    fn next(&mut self) -> Option<Self::Item> {
        match self.source.next() {
            Some(c) => match c {
                '[' => Some(Ok(Token::Bracket(ParenthesisType::Open))),
                ']' => Some(Ok(Token::Bracket(ParenthesisType::Close))),
                '{' => Some(Ok(Token::CurlyBracket(ParenthesisType::Open))),
                '}' => Some(Ok(Token::CurlyBracket(ParenthesisType::Close))),
                ',' => Some(Ok(Token::ElementDelimiter)),
                ':' => Some(Ok(Token::KeyDelimiter)),
                c if c.is_ascii_whitespace() => self.next(),
                c if c.is_ascii_digit() || c == '-' || c == '+' => {
                    // prevent leading zeros and useless signs
                    {
                        let err = match c {
                            '0' => match self.source.peek() {
                                Some(n) if n.is_ascii_digit() => Some(Error::InvalidNumberFormat),
                                _ => None,
                            },
                            '+' => Some(Error::InvalidNumberFormat),
                            _ => None,
                        };

                        if let Some(e) = err {
                            self.read_while(|next| match next {
                                ',' | ']' | '}' => false,
                                _ => true,
                            });

                            return Some(Err(e));
                        }
                    }

                    let mantissa = {
                        let mut rest = self.read_while(|next| next.is_ascii_digit() || next == '.');
                        rest.insert(0, c);
                        rest
                    };

                    let exponent: Option<String> = match self.source.peek() {
                        Some('e') | Some('E') => {
                            self.source.next();

                            let exp = self.read_while(|next| {
                                next.is_ascii_digit() || next == '+' || next == '-'
                            });

                            if exp == "+" || exp == "-" || exp.is_empty() {
                                return Some(Err(Error::InvalidExponentFormat));
                            }

                            Some(exp)
                        }
                        _ => None,
                    };

                    let parsed_mantissa = match mantissa.parse::<f64>() {
                        Ok(num) => num,
                        Err(_) => return Some(Err(Error::InvalidNumberFormat)),
                    };

                    let parsed_exponent = match exponent.map(|e| e.parse::<i16>()) {
                        Some(Err(_)) => return Some(Err(Error::InvalidNumberFormat)),
                        Some(Ok(exponent)) => Some(exponent),
                        None => None,
                    };

                    Some(Ok(Token::Number(JSONNumber::new(
                        parsed_mantissa,
                        parsed_exponent,
                    ))))
                }
                _ => Some(Err(Error::UnknownChar)),
            },
            None => None,
        }
    }
}

impl<I> Lexer<I>
where
    I: Iterator<Item = char>,
{
    fn read_while<T>(&mut self, predicate: T) -> String
    where
        T: Fn(char) -> bool,
    {
        let mut res = String::new();

        while let Some(next) = self.source.peek() {
            match *next {
                next if predicate(next) => {
                    res.push(self.source.next().unwrap());
                }
                _ => break,
            }
        }

        res
    }
}

pub fn lex(source: &String) -> Result<Vec<Token>> {
    Lexer::from(source.chars()).collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    macro_rules! lexer_tests {
        ($($name:ident: $value:expr,)*) => {
            $(
                #[test]
                fn $name() {
                    let (input, expected) = $value;
                    assert_eq!(lex(&input.to_string()), expected);
                }
            )*
        }
    }

    mod brackets {
        use super::*;

        lexer_tests! {
            bracket_open: (
                "[",
                Ok(vec![Token::Bracket(ParenthesisType::Open)])
            ),
            bracket_close: (
                "]",
                Ok(vec![Token::Bracket(ParenthesisType::Close)].to_vec())
            ),
            bracket_pair: (
                "[]",
                Ok(vec![Token::Bracket(ParenthesisType::Open), Token::Bracket(ParenthesisType::Close)])
            ),
            bracket_nested: (
                "[[]]",
                Ok(vec![
                    Token::Bracket(ParenthesisType::Open),
                    Token::Bracket(ParenthesisType::Open),
                    Token::Bracket(ParenthesisType::Close),
                    Token::Bracket(ParenthesisType::Close)
                ])
            ),
            bracket_mixed: (
                "[[][",
                Ok(vec![
                    Token::Bracket(ParenthesisType::Open),
                    Token::Bracket(ParenthesisType::Open),
                    Token::Bracket(ParenthesisType::Close),
                    Token::Bracket(ParenthesisType::Open),
                ])
            ),
        }
    }

    mod curly_brackets {
        use super::*;

        lexer_tests! {
            curly_open: (
                "{",
                Ok(vec![Token::CurlyBracket(ParenthesisType::Open)])
            ),
            curly_close: (
                "}",
                Ok(vec![Token::CurlyBracket(ParenthesisType::Close)])
            ),
            curly_pair: (
                "{}",
                Ok(vec![
                    Token::CurlyBracket(ParenthesisType::Open),
                    Token::CurlyBracket(ParenthesisType::Close),
                ])
            ),
            curly_nested: (
                "{{}}",
                Ok(vec![
                    Token::CurlyBracket(ParenthesisType::Open),
                    Token::CurlyBracket(ParenthesisType::Open),
                    Token::CurlyBracket(ParenthesisType::Close),
                    Token::CurlyBracket(ParenthesisType::Close),
                ])
            ),
            curly_mixed: (
                "}}{}",
                Ok(vec![
                    Token::CurlyBracket(ParenthesisType::Close),
                    Token::CurlyBracket(ParenthesisType::Close),
                    Token::CurlyBracket(ParenthesisType::Open),
                    Token::CurlyBracket(ParenthesisType::Close),
                ])
            ),
        }
    }

    mod curly_and_normal {
        use super::*;

        lexer_tests! {
            curly_and_normal_mixed: (
                "[}}{[]]}]",
                Ok(vec![
                    Token::Bracket(ParenthesisType::Open),
                    Token::CurlyBracket(ParenthesisType::Close),
                    Token::CurlyBracket(ParenthesisType::Close),
                    Token::CurlyBracket(ParenthesisType::Open),
                    Token::Bracket(ParenthesisType::Open),
                    Token::Bracket(ParenthesisType::Close),
                    Token::Bracket(ParenthesisType::Close),
                    Token::CurlyBracket(ParenthesisType::Close),
                    Token::Bracket(ParenthesisType::Close),
                ])
             ),
        }
    }

    mod delimiter {
        use super::*;

        lexer_tests! {
            element_delimiter: (
                ",",
                Ok(vec![Token::ElementDelimiter])
            ),
            element_delimiter_multiple: (
                ",,,,",
                Ok(vec![
                    Token::ElementDelimiter,
                    Token::ElementDelimiter,
                    Token::ElementDelimiter,
                    Token::ElementDelimiter,
                ])
            ),
            key_delimiter: (
                ":",
                Ok(vec![Token::KeyDelimiter])
            ),
            key_delimiter_multiple: (
                ":::",
                Ok(vec![
                    Token::KeyDelimiter,
                    Token::KeyDelimiter,
                    Token::KeyDelimiter,
                ])
            ),
        }
    }

    mod number {
        use super::*;

        lexer_tests! {
            number_zero: (
                "0",
                Ok(vec![Token::Number(JSONNumber::new(0.0, None))])
            ),
            number_multiple: (
                "0 1 2",
                Ok(vec![
                    Token::Number(JSONNumber::new(0.0, None)),
                    Token::Number(JSONNumber::new(1.0, None)),
                    Token::Number(JSONNumber::new(2.0, None)),
                ])
            ),
            number_long: (
                "1000000",
                Ok(vec![Token::Number(JSONNumber::new(1000000.0, None))])
            ),
            number_no_exponent: (
                "4",
                Ok(vec![Token::Number(JSONNumber::new(4.0, None))])
            ),
            number_unsigned_exponent: (
                "4E2",
                Ok(vec![Token::Number(JSONNumber::new(4.0, Some(2)))])
            ),
            number_unsigned_long_exponent: (
                "4E200",
                Ok(vec![Token::Number(JSONNumber::new(4.0, Some(200)))])
            ),
            number_unsigned_padded_exponent: (
                "4E000002",
                Ok(vec![Token::Number(JSONNumber::new(4.0, Some(2)))])
            ),
            number_pos_signed_padded_exponent: (
                "4E+000002",
                Ok(vec![Token::Number(JSONNumber::new(4.0, Some(2)))])
            ),
            number_signed_exponent: (
                "4E-2",
                Ok(vec![Token::Number(JSONNumber::new(4.0, Some(-2)))])
            ),
            number_signed_padded_exponent: (
                "4E-000002",
                Ok(vec![Token::Number(JSONNumber::new(4.0, Some(-2)))])
            ),
            float: (
                "14.0",
                Ok(vec![Token::Number(JSONNumber::new(14.0, None))])
            ),
            float_multiple: (
                "0.1 12.5 2.12",
                Ok(vec![
                    Token::Number(JSONNumber::new(0.1, None)),
                    Token::Number(JSONNumber::new(12.5, None)),
                    Token::Number(JSONNumber::new(2.12, None)),
                ])
            ),
            float_multiple_exp: (
                "0.1E1 12.5E-0002 2.12E213",
                Ok(vec![
                    Token::Number(JSONNumber::new(0.1, Some(1))),
                    Token::Number(JSONNumber::new(12.5, Some(-0002))),
                    Token::Number(JSONNumber::new(2.12, Some(213))),
                ])
            ),
            float_long: (
                "10000000000000000.0",
                Ok(vec![Token::Number(JSONNumber::new(10000000000000000.0, None))])
            ),
            float_complex: (
                "214.12498",
                Ok(vec![Token::Number(JSONNumber::new(214.12498, None))])
            ),
            float_signed_complex: (
                "-214.12498",
                Ok(vec![Token::Number(JSONNumber::new(-214.12498, None))])
            ),
            float_signed_exp: (
                "-214.12498E+001",
                Ok(vec![Token::Number(JSONNumber::new(-214.12498, Some(1)))])
            ),
            float_signed_negative_exp: (
                "-214.12498E-200",
                Ok(vec![Token::Number(JSONNumber::new(-214.12498, Some(-200)))])
            ),
            float_unsigned_exp: (
                "2.0E2",
                Ok(vec![Token::Number(JSONNumber::new(2.0, Some(2)))])
            ),
            invalid_float_many_decimal_points: (
                "20.0.0.0",
                Err(Error::InvalidNumberFormat)
            ),
            invalid_number: (
                "+2",
                Err(Error::InvalidNumberFormat)
            ),
        }
    }
}
