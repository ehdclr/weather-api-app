export const regionsArraySchema = {
    type: "array",
    items: {
      type: "string",
    },
    minItems: 1,
    uniqueItems: true 
  };
  
