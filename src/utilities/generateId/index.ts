//* ======================================================================================
//* FUNCTION THAT GENERATES A UNIQUE ID (version: 0.1 - 30/03/2022)
//* Generates a unique 13 digit numeric id and checks that no duplicate ids are generated.
//* ======================================================================================
const ids: number | string[] = [];

export const generateId = (): string => {
  const id: string = Math.random().toString(16).substring(2, 16);
  const exists: string | undefined = ids.find(i => i === id);
  if (exists === undefined) {
    ids.push(id);
  } else {
    generateId();
  }
  return id;
};
//* ======================================================================================
