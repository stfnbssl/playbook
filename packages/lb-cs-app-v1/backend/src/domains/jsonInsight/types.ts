export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonValue[] | { [k: string]: JsonValue };

export interface InferredField {
  path: string;
  types: string[];
  examples?: string[];
}

export interface InferredSchema {
  fields: InferredField[];
  depth: number;
  hasArrays: boolean;
}
