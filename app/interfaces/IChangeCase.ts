export interface IChangeCase {
  input: string;
  options?: IChangeCaseOptions;
}

export interface IChangeCaseOptions {
  alphaNumeric?: boolean;
  replace?: string;
}

export interface ITitleCaseOptions extends IChangeCaseOptions {
  capitaliseStopWords?: boolean;
}
