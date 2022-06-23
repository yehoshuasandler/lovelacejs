// import ProgressBar from 'progress'

import tableTests from './core/tableTests.js'
import noduleTests from './core/NoduleTests.js'
import filterNoduleTests from './core/nodules/filterNoduleTests.js'
import joinNoduleTests from './core/nodules/joinNoduleTests.js'
import transformNoduleTests from './core/nodules/transformNoduleTests.js'
import groupByNoduleTests from './core/nodules/groupByNoduleTests.js'
import sortNoduleTests from './core/nodules/sortNoduleTests.js'

type unitTest = { name: string, test: Function }

function runTestsAndReturnFailures (tests: unitTest[]): string[]  {
  const testTotalCount = tests.length
  const testsFailed: string[] = []

  for (let i = 0; i < testTotalCount; i++) {
    const passedTest = tests[i].test()
    if (!passedTest) testsFailed.push(tests[i].name)
  }
  return testsFailed
}

function init (tests: unitTest[]) {
  const failedTestsResults = runTestsAndReturnFailures(tests)
  if (failedTestsResults.length === 0) {
    console.log('\x1b[32m%s\x1b[0m', 'All Tests Passed!!')
  } else {
    console.log(`\x1b[31mFailed ${failedTestsResults.length} tests.\x1b[0m`)
    failedTestsResults.forEach(test => {
      console.log(`\x1b[33m${test}\x1b[0m`)
    })
  }
}

const testsArray = [
  tableTests,
  noduleTests,
  filterNoduleTests,
  joinNoduleTests,
  transformNoduleTests,
  groupByNoduleTests,
  sortNoduleTests,
]

init (testsArray.flat())