const errorTypeReg = new RegExp(
    '(' + [
      'EvalError:',
      'InternalError:',
      'RangeError:',
      'ReferenceError:',
      'SyntaxError:',
      'TypeError:',
      'URIError:',
      'Error:' // new Error
    ].join('|') + ')',
    'mi'
); 

export default errorTypeReg;
