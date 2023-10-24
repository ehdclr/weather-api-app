const shortTermForecastDataSchema = {
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
                  TMP: { type: 'string' },
                  UUU: { type: 'string' },
                  VVV: { type: 'string' },
                  VEC: { type: 'string' },
                  WSD: { type: 'string' },
                  SKY: { type: 'string' },
                  PTY: { type: 'string' },
                  POP: { type: 'string' },
                  WAV: { type: 'string' },
                  PCP: { type: 'string' },
                  REH: { type: 'string' },
                  SNO: { type: 'string' }
                },
                required: [
                  'TMP', 'UUU', 'VVV', 'VEC', 'WSD', 'SKY', 
                  'PTY', 'POP', 'WAV', 'PCP', 'REH', 'SNO'
                ]
              }
            }
          }
        }
      }
    },
    required: ['cityName', 'forecast']
  };
  
  export default shortTermForecastDataSchema;