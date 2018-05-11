// taken from flux standard action until they correct meta and payload not beeing trully optionnal (as of v2.1.0)
// see https://github.com/redux-utilities/flux-standard-action/pull/106

import {Action} from 'redux';

export interface FluxStandardAction<Payload, Meta = undefined> extends Action {
  /**
   * The `type` of an action identifies to the consumer the nature of the action that has occurred.
   * Two actions with the same `type` MUST be strictly equivalent (using `===`)
   */
  type: string;
  /**
   * The optional `payload` property MAY be any type of value.
   * It represents the payload of the action.
   * Any information about the action that is not the type or status of the action should be part of the `payload` field.
   * By convention, if `error` is `true`, the `payload` SHOULD be an error object.
   * This is akin to rejecting a promise with an error object.
   */
  payload?: Payload;
  /**
   * The optional `error` property MAY be set to true if the action represents an error.
   * An action whose `error` is true is analogous to a rejected Promise.
   * By convention, the `payload` SHOULD be an error object.
   * If `error` has any other value besides `true`, including `undefined`, the action MUST NOT be interpreted as an error.
   */
  error?: boolean;
  /**
   * The optional `meta` property MAY be any type of value.
   * It is intended for any extra information that is not part of the payload.
   */
  meta?: Meta;
}

export interface ErrorFluxStandardAction<CustomError extends Error, Meta = undefined> extends FluxStandardAction<CustomError, Meta> {
  error: true;
}

/**
 * Alias for FluxStandardAction.
 */
export type FSA<Payload = undefined, Meta = undefined> = FluxStandardAction<Payload, Meta>;

/**
 * Alias for ErrorFluxStandardAction.
 */
export type ErrorFSA<CustomError extends Error, Meta = undefined> = ErrorFluxStandardAction<CustomError, Meta>;

