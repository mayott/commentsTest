import React from 'react'
import { EuiBasicTable, EuiFieldSearch } from '@elastic/eui'
import { useSelector } from 'react-redux'

const CommentsTable = ({
  handleSearchChange,
  handlePageChange,
  columns,
  searchValue,
}) => {
  const {
    items,
    total: totalItemCount,
    loading,
    error,
    page,
    limit: pageSize,
  } = useSelector((state) => state.comments)

  return (
    <>
      <EuiFieldSearch
        placeholder='Search'
        value={searchValue}
        isClearable
        onChange={(e) => handleSearchChange(e)}
        fullWidth
      />
      <EuiBasicTable
        id={'commentsTable'}
        columns={columns}
        items={items}
        loading={loading}
        pagination={{
          pageIndex: page - 1,
          totalItemCount,
          pageSize,
          pageSizeOptions: [5, 10, 20],
        }}
        onChange={handlePageChange}
        error={error}
      />
    </>
  )
}

export default CommentsTable
