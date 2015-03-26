/* global spyOn */
(function (root) {
  la(check.fn(root.spyOn), 'missing spyOn function');

  /**
    Spies on given object[methodName] using Jasmine spyOn
    keeps track of number of calls and if any conditions were false

    @example
      var spy = spyOnPredicate(window, 'lac');
      // do something that causes window.lac(false, ...)
      expect(spy.failed).toBe(true);
  */
  function spyOnPredicate(object, methodName) {
    la(check.object(object), 'missing object to spy on');
    la(check.unemptyString(methodName), 'missing method name');

    var wasAlwaysTruthy = true;
    var called = 0;
    spyOn(object, methodName).and.callFake(function (condition) {
      called += 1;
      wasAlwaysTruthy = wasAlwaysTruthy && Boolean(condition);
    });

    return {
      get wasCalled() {
        return called > 0;
      },
      get failed() {
        return !wasAlwaysTruthy;
      }
    };
  }

  root.spyOnPredicate = spyOnPredicate;
}(this));
