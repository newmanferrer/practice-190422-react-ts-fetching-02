export type action =
  | {
      type: 'changeValue';
      payload: {
        name: string;
        value: string;
      };
    }
  | {
      type: 'setForm';
      payload: any;
    }
  | {
      type: 'clearForm';
      payload: any;
    };
