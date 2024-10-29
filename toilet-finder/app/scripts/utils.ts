export function padding(
    a: number,
    b?: number | undefined,
    c?: number | undefined,
    d?: number | undefined
  ) {
    return {
      paddingTop: a,
      paddingRight: b ?? a,
      paddingBottom: c ?? a,
      paddingLeft: d ?? b ?? a,
    };
  }

  export function margin(
    a: number,
    b?: number | undefined,
    c?: number | undefined,
    d?: number | undefined
  ) {
    return {
      marginTop: a,
      marginRight: b ?? a,
      marginBottom: c ?? a,
      marginLeft: d ?? b ?? a,
    };
  }