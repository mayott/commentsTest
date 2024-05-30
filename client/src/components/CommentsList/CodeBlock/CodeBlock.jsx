import { EuiCodeBlock, EuiLoadingSpinner } from '@elastic/eui'
import React from 'react'

const CodeBlock = ({ comments, loading }) => {
  if (loading) return <EuiLoadingSpinner />
  return (
    <EuiCodeBlock language='json' paddingSize='m'>
      {JSON.stringify(comments, null, 2)}
    </EuiCodeBlock>
  )
}

export default CodeBlock
