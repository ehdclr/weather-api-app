const utrSrtDataSchema = {
    type: 'object',
    properties: {
      cityName: { type: 'string' },
      forecast: {
        type: 'object',
        patternProperties: {
          "^[0-9]{8}$": {
            type: 'object',
            patternProperties: {
              "^[0-9]{4}$": {
                type: 'object',
                properties: {
                  LGT: { type: 'string' },
                  PTY: { type: 'string' },
                  RN1: { type: 'string' },
                  SKY: { type: 'string' },
                  T1H: { type: 'string' },
                  REH: { type: 'string' },
                  UUU: { type: 'string' },
                  VVV: { type: 'string' },
                  VEC: { type: 'string' },
                  WSD: { type: 'string' }
                },
                required: [
                  'LGT', 'PTY', 'RN1', 'SKY', 'T1H', 'REH', 
                  'UUU', 'VVV', 'VEC', 'WSD'
                ]
              }
            }
          }
        }
      }
    },
    required: ['cityName', 'forecast']
  };
  
  export default utrSrtDataSchema;