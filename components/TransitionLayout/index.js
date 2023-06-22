import { useRouter } from 'next/router'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

import { getBoundingClientRect } from '../../utils/dom'
import Lenis from '../../utils/scroll'

const TransitionLayout = ({ children, nextUrl, setNextUrl }) => {
    const router = useRouter()
    const { query: { id }, asPath } = router
    const key = id || asPath

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

    const classNames = asPath.startsWith("/project/") ? "project-page" : "page";
    const timeOut = asPath.startsWith("/project/") ? 1500 : 400;

    return (
        <SwitchTransition>
            <CSSTransition
                classNames={classNames}
                key={key}
                onEnter={onEnter}
                onEntered={onEntered}
                timeout={timeOut}
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

                    .project-page-enter {
                        opacity: 0;
                    }

                    .project-page-enter-active {
                        opacity: 1;
                        transition: opacity 1500ms;
                    }

                    .project-page-exit {
                        opacity: 1;
                    }

                    .project-page-exit-active {
                        opacity: 1;
                        transition: opacity 1500ms cubic-bezier(0.32, 0, 0.67, 0);
                    }
                    `}
                    </style>
                </>
            </CSSTransition>
        </SwitchTransition >
    )
}

export default TransitionLayout
