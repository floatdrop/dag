/* global describe, it */
'use strict';

var Dag = require('..');
require('should');

describe('cycle finding', function () {
    it('should not throw when building acyclic graph', function () {
        var dag = new Dag();
        (function () {
            dag.addEdge('A', 'B');
            dag.addEdge('C', 'B');
            dag.addEdge('B', 'D');
            dag.addEdge('B', 'E');
            dag.addEdge('D', 'F');
            dag.addEdge('E', 'G');
            dag.addEdge('D', 'G');
            dag.addEdge('E', 'F');
        }).should.not.throwError();
    });

    it('should throw when building graph with cycle', function () {
        var dag = new Dag();
        (function () {
            dag.addEdge('A', 'B');
            dag.addEdge('B', 'C');
            dag.addEdge('C', 'A');
        }).should.throwError('Cycle found: C -> A');
    });
});
