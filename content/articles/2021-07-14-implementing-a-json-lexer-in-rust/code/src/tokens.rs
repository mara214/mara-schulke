use crate::types::*;

#[derive(Clone, Debug, PartialEq)]
pub enum Token {
    Bracket(ParenthesisType),
    CurlyBracket(ParenthesisType),
    ElementDelimiter,
    KeyDelimiter,
    Null,
    Boolean(JSONBoolean),
    Number(JSONNumber),
    String(JSONString),
}

#[derive(Clone, Debug, PartialEq)]
pub enum ParenthesisType {
    Open,
    Close,
}
