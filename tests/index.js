// import ProgressBar from 'progress'

import tableTests from '../tests/core/tableTests.js'
import noduleTests from '../tests/core/NoduleTests.js'
import filterNoduleTests from '../tests/core/nodules/filterNoduleTests.js'
import joinNoduleTests from '../tests/core/nodules/joinNoduleTests.js'
import transformNoduleTests from '../tests/core/nodules/transformNoduleTests.js'

function runTestsAndReturnFailures (tests) {
  const testTotalCount = tests.length
  const testsFailed = []

  for (let i = 0; i < testTotalCount; i++) {
    const passedTest = tests[i].test()
    if (!passedTest) testsFailed.push(tests[i].name)
  }
  return testsFailed
}

function init (tests) {
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
  transformNoduleTests
]

init (testsArray.flat())