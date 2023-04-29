import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { useMemo } from 'react'

import { PaginationItem } from './PaginationItem'

const REGISTER_PER_PAGE = 10
const SIBLINGS_COUNT = 2

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1
    })
    .filter((page) => page > 0)
}

type PaginationProps = {
  totalCountOfResults?: number
  currentPage?: number
  showPagination?: boolean
  onPageChange: (page: number) => void
}

export function Pagination({
  onPageChange,
  totalCountOfResults = 0,
  currentPage = 1,
  showPagination = true,
}: PaginationProps) {
  const lastPage = useMemo(
    () => Math.ceil(totalCountOfResults / REGISTER_PER_PAGE),
    [totalCountOfResults],
  )

  const previousPages = useMemo(() => {
    if (currentPage <= 1) {
      return []
    }

    return generatePagesArray(currentPage - 1 - SIBLINGS_COUNT, currentPage - 1)
  }, [currentPage])

  const nextPages = useMemo(() => {
    if (currentPage >= lastPage) {
      return []
    }

    return generatePagesArray(
      currentPage,
      Math.min(currentPage + SIBLINGS_COUNT, lastPage),
    )
  }, [currentPage, lastPage])

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <span className="text-base font-semibold text-primary-pure">
        {totalCountOfResults} participantes
      </span>

      {showPagination && totalCountOfResults > REGISTER_PER_PAGE ? (
        <div className="flex gap-2">
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full border border-solid border-background bg-white text-neutral-low-pure disabled:cursor-not-allowed disabled:text-neutral-low-light"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <CaretLeft size={16} />
          </button>

          {currentPage > 1 + SIBLINGS_COUNT ? (
            <>
              <PaginationItem
                onClick={() => onPageChange(1)}
                data-testid="pagination-item-1"
              >
                1
              </PaginationItem>
              {currentPage > 2 + SIBLINGS_COUNT ? (
                <p
                  className="self-center text-neutral-low-light"
                  data-testid="pagination-prev-three-dots"
                >
                  •••
                </p>
              ) : null}
            </>
          ) : null}

          {previousPages.length > 0
            ? previousPages.map((page) => {
                return (
                  <PaginationItem
                    key={page}
                    onClick={() => onPageChange(page)}
                    data-testid={`pagination-item-next-${page}`}
                  >
                    {page}
                  </PaginationItem>
                )
              })
            : null}

          <PaginationItem
            isActive
            data-testid={`pagination-item-${currentPage}`}
          >
            {currentPage}
          </PaginationItem>

          {nextPages.length > 0
            ? nextPages.map((page) => {
                return (
                  <PaginationItem
                    key={page}
                    onClick={() => onPageChange(page)}
                    data-testid={`pagination-item-next-${page}`}
                  >
                    {page}
                  </PaginationItem>
                )
              })
            : null}

          {currentPage + SIBLINGS_COUNT < lastPage ? (
            <>
              {currentPage + 1 + SIBLINGS_COUNT < lastPage ? (
                <p
                  className="self-center text-neutral-low-light"
                  data-testid="pagination-next-three-dots"
                >
                  •••
                </p>
              ) : null}

              <PaginationItem
                onClick={() => onPageChange(lastPage)}
                data-testid={`pagination-item-${lastPage}`}
              >
                {lastPage}
              </PaginationItem>
            </>
          ) : null}

          <button
            className="flex h-8 w-8 items-center justify-center rounded-full border border-solid border-background bg-white text-neutral-low-pure disabled:cursor-not-allowed disabled:text-neutral-low-light"
            disabled={currentPage === lastPage}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <CaretRight size={16} />
          </button>
        </div>
      ) : null}
    </div>
  )
}
