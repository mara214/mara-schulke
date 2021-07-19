pub type JSONBoolean = bool;
pub type JSONString = String;

#[derive(Clone, Copy, Debug, PartialEq)]
pub struct JSONNumber {
    mantissa: f64,
    exponent: Option<i16>,
}
