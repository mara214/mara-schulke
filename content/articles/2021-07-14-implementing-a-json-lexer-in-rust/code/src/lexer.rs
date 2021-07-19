use std::iter::Peekable;

use crate::tokens::*;
use crate::types::*;

#[derive(Clone, Debug, PartialEq)]
pub enum Error {
    UnexpectedEOF,
    UnknownChar,
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
                _ => Some(Err(Error::UnknownChar)),
            },
            None => None,
        }
    }
}

pub fn lex(source: &String) -> Result<Vec<Token>> {
    Lexer::from(source.chars()).collect()
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::tokens::*;

    macro_rules! lexer_tests {
        ($($name:ident: $value:expr,)*) => {
            $(
                #[test]
                fn $name() {
                    let (input, expected) = $value;
                    assert_eq!(lex(&input.to_string()).unwrap(), expected);
                }
            )*
        }
    }

    mod brackets {
        use super::*;

        lexer_tests! {
            bracket_open: (
                "[",
                [Token::Bracket(ParenthesisType::Open)],
            ),
            bracket_close: (
                "]",
                [Token::Bracket(ParenthesisType::Close)]
            ),
            bracket_pair: (
                "[]",
                [Token::Bracket(ParenthesisType::Open), Token::Bracket(ParenthesisType::Close)]
            ),
            bracket_nested: (
                "[[]]",
                [
                    Token::Bracket(ParenthesisType::Open),
                    Token::Bracket(ParenthesisType::Open),
                    Token::Bracket(ParenthesisType::Close),
                    Token::Bracket(ParenthesisType::Close)
                ]
            ),
            bracket_mixed: (
                "[[][",
                [
                    Token::Bracket(ParenthesisType::Open),
                    Token::Bracket(ParenthesisType::Open),
                    Token::Bracket(ParenthesisType::Close),
                    Token::Bracket(ParenthesisType::Open),
                ]
            ),
        }
    }

    mod curly_brackets {
        use super::*;

        lexer_tests! {
            curly_open: (
                "{",
                [Token::CurlyBracket(ParenthesisType::Open)]
            ),
            curly_close: (
                "}",
                [Token::CurlyBracket(ParenthesisType::Close)]
            ),
            curly_pair: (
                "{}",
                [Token::CurlyBracket(ParenthesisType::Open), Token::CurlyBracket(ParenthesisType::Close)]
            ),
            curly_nested: (
                "{{}}",
                [
                    Token::CurlyBracket(ParenthesisType::Open),
                    Token::CurlyBracket(ParenthesisType::Open),
                    Token::CurlyBracket(ParenthesisType::Close),
                    Token::CurlyBracket(ParenthesisType::Close),
                ]
            ),
            curly_mixed: (
                "}}{}",
                [
                    Token::CurlyBracket(ParenthesisType::Close),
                    Token::CurlyBracket(ParenthesisType::Close),
                    Token::CurlyBracket(ParenthesisType::Open),
                    Token::CurlyBracket(ParenthesisType::Close),
                ]
            ),
        }
    }

    mod curly_and_normal {
        use super::*;

        lexer_tests! {
            curly_and_normal_mixed: (
                "[}}{[]]}]",
                [
                    Token::Bracket(ParenthesisType::Open),
                    Token::CurlyBracket(ParenthesisType::Close),
                    Token::CurlyBracket(ParenthesisType::Close),
                    Token::CurlyBracket(ParenthesisType::Open),
                    Token::Bracket(ParenthesisType::Open),
                    Token::Bracket(ParenthesisType::Close),
                    Token::Bracket(ParenthesisType::Close),
                    Token::CurlyBracket(ParenthesisType::Close),
                    Token::Bracket(ParenthesisType::Close),
                ]
             ),
        }
    }
}
