type ElementConstructor<T> = {
  prototype: T
  new (): T
}

export function $id<E extends HTMLElement>(id: string, elementType: ElementConstructor<E>): E {
  const element = document.getElementById(id)

  if (element === null) {
    throw new TypeError(`Element with id ${id} was not found!`)
  }

  if (!(element instanceof elementType)) {
    throw new TypeError(`Element with id ${id} is not of type ${elementType}!`)
  }

  return element
}

export const $$ = document.querySelectorAll.bind(document)
