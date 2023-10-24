const currentDataSchema = {
  type: 'object',
  properties: {
    cityName: { type: 'string' },
    forecast: {
      type: 'object',
      patternProperties: {
        "^[0-9]{8}$": {
          type: 'object',
          patternProperties: {
            "^[0-2][0-9]{3}$": {
              type: 'object',
              properties: {
                PTY: { type: 'string' },
                REH: { type: 'string' },
                RN1: { type: 'string' },
                T1H: { type: 'string' },
                UUU: { type: 'string' },
                VEC: { type: 'string' },
                VVV: { type: 'string' },
                WSD: { type: 'string' }
              },
              required: ['PTY', 'REH', 'RN1', 'T1H', 'UUU', 'VEC', 'VVV', 'WSD']
            }
          }
        }
      }
    }
  },
  required: ['cityName', 'forecast'],
  additionalProperties: false
};

export default currentDataSchema;