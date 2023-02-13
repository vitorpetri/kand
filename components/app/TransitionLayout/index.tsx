import { useRouter } from 'next/router'
import { FC } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

import { getBoundingClientRect } from 'utils/dom'
import Lenis from 'utils/scroll'

interface ITransitionLayout {
  children: Array<JSX.Element> | JSX.Element
}

const TransitionLayout: FC<ITransitionLayout> = ({
  children
}): JSX.Element => {
  const router = useRouter()

  const onEnter = () => {
    Lenis?.setScroll(0)
  }

  const onEntered = () => {
    const { hash } = window.location

    if (hash) {
      const section = document.querySelector(hash)

      if (section) {
        const { top } = getBoundingClientRect(section)

        Lenis?.scrollTo(top)
      }
    }
  }

  const { query: { id }, pathname } = router
  const key = id as string || pathname as string

  return (
    <SwitchTransition>
      <CSSTransition
        classNames='page'
        key={key}
        onEnter={onEnter}
        onEntered={onEntered}
        timeout={250}
      >
        <>
          {children}

          <style jsx global>
            {`
              .page-enter {
                // transform: translateY(50%) scale(1.5);
                opacity: 0;
              }

              .page-enter-active {
                // transform: translateY(0) scale(1);
                opacity: 1;
                transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
              }

              .page-exit {
                // transform: translateY(0) scale(1);
                opacity: 1;
              }

              .page-exit-active {
                // transform: translateY(-50%) scale(0.1);
                opacity: 0;
                transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
              }
            `}
          </style>
        </>
      </CSSTransition>
    </SwitchTransition>
  )
}

export default TransitionLayout
