/*http://embed.plnkr.co/2i7IHs/*/

(function () {
  'use strict';
  describe('rest factory', function () {

    var mockRestFactory, httpBackend, mockLog;

    beforeEach(module('fullStackCodingChallenge'));

    beforeEach(inject(function($injector, apiBaseUrl, _RestFactory_) {
      // Set up the mock http service responses
      httpBackend = $injector.get('$httpBackend');
      mockLog = $injector.get('$log');
      mockRestFactory = _RestFactory_;
      console.log(apiBaseUrl);
      httpBackend.when('GET', apiBaseUrl + '/?candidate=cjm123').respond(200, [{
        candidate: 'cjm123',
        id: '1'
      }]);
    }));

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('should be a resource', function() {
      expect(typeof mockRestFactory).toBe('object');
      expect(typeof mockRestFactory.makeRequest).toBe('function');
    });

    it('should return an array on request', function(apiBaseUrl) {

      //mockRestFactory.makeRequest({
      //  method: 'GET',
      //  url: apiBaseUrl,
      //  parameters: {
      //    candidate: 'cjm123'
      //  }
      //}).then(function(users) {
      //  expect(angular.isArray(users)).toBeTruthy();
      //});
      //httpBackend.flush();
    });

  });
})();

