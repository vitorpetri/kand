import { useRouter } from 'next/router'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

import { getBoundingClientRect } from '../../utils/dom'
import Lenis from '../../utils/scroll'

const TransitionLayout = ({ children }) => {
    const router = useRouter()

    const onEnter = () => {
        console.log("onEnter Called", key);

        if (Lenis) {
            Lenis.setScroll(0)
        }
    }

    const onEntered = () => {
        console.log("onEntered Called", key);

        const { hash } = window.location

        if (hash) {
            const section = document.querySelector(hash)

            if (section) {
                const { top } = getBoundingClientRect(section)

                if (Lenis) {
                    Lenis.scrollTo(top)
                }
            }
        }
    }

    const { query: { id }, asPath } = router
    const key = id || asPath

    return (
        <SwitchTransition>
            <CSSTransition
                classNames='page'
                key={key}
                onEnter={onEnter}
                onEntered={onEntered}
                timeout={400}
            >
                <>
                    {children}

                    <style jsx global>
                        {`
              .page-enter {
                opacity: 0;
              }

              .page-enter-active {
                opacity: 1;
                transition: opacity 400ms;
              }

              .page-exit {
                opacity: 1;
              }

              .page-exit-active {
                opacity: 0;
                transition: opacity 400ms;
              }
            `}
                    </style>
                </>
            </CSSTransition>
        </SwitchTransition>
    )
}

export default TransitionLayout
