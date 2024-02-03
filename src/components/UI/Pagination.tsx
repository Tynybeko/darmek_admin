import React, { SetStateAction } from 'react'
import '../../styles/pagination_style.scss'

export default function Pagination({ pageCount, page, setPage }: { pageCount: number | undefined | null, page: number, setPage: React.Dispatch<SetStateAction<number>> }) {
  return (
    <tfoot className='pagination-component'>
      <tr>
        <th scope='row' colSpan={2}>
          <div className={'block'}>
            <button disabled={page == 1} onClick={() => setPage(prev => prev - 1)} className='prev'>
              <svg className="feather feather-chevron-right" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><polyline points="9 18 15 12 9 6" /></svg></button>

            <div className='counter'>
              {
                (() => {
                  let count = []
                  for (let i = 1; i <= (pageCount || 1); i++) {
                    count.push((
                      <p onClick={() => setPage(i)} key={Math.random()} className={`${page == i ? 'actived' : ''} sel-no`}>{i}</p>
                    ))
                  }
                  return count
                })()
              }
            </div>
            <button disabled={page == pageCount} onClick={() => setPage(prev => prev + 1)} className='next'>
              <svg className="feather feather-chevron-right" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><polyline points="9 18 15 12 9 6" /></svg></button>

          </div>
        </th>
      </tr>
    </tfoot>
  )
}
