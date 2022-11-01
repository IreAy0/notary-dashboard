import { createSelector } from 'reselect';

const authNameSelector = (state: any) => state.auth.email;
const authEmailSelector = (state: any) => state.auth.username;

export const viewableNameSelector = createSelector(
  [authNameSelector, authEmailSelector],
  (items) => `Username: ${items.username}, email: ${items.email}`
);

export const testSelector = createSelector(
  [authNameSelector, authEmailSelector],
  (items) => `Username: ${items.username}, email: ${items.email}`
);
