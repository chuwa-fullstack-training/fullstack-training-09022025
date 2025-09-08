/*
 * Copy the enumerable properties of p to o, and return o.
 * If o and p have a property by the same name, o's property is overwritten.
 * This function does not handle getters and setters or copy attributes.
 */
function extend(o, p) {
  for (let property in p) {
    o[property] = p[property];
  }
  return o;
}

/*
 * Return a new object that holds the properties of both o and p.
 * If o and p have properties by the same name, the values from o are used.
 */
function union(o, p) {
  var q = Object.create(Object.prototype, {});
  for (let property in p) {
    q[property] = p[property];
  }
  // Copy properties from o after p, so that values from o are used in
  // properties of the same name
  for (let property in o) {
    q[property] = o[property];
  }
  return q;
}

/*
 * Remove properties from o if there is not a property with the same name in p.
 * Return o.
 */
function restrict(o, p) {
  for (let property in o) {
    if (property in p === false) {
      delete o[property];
    }
  }
  return o;
}

/*
 * Return a new object that holds only the properties of o that also appear
 * in p. This is something like the intersection of o and p, but the values of
 * the properties in p are discarded
 */
function intersection(o, p) {
  var q = Object.create(Object.prototype, {});
  for (let property in o) {
    if (property in p) {
      q[property] = o[property]; // Use value in o
    }
  }
  return q;
}
