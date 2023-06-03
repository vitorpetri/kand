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

    const onExited = () => {
        console.log("onExited Called", key);
        if (nextUrl) {
            router.push(nextUrl);
            setNextUrl(null);
        }
    }

    const classNames = asPath.startsWith("/project/") ? "project-page" : "page";
    const timeOut = asPath.startsWith("/project/") ? 670 : 400;

    return (
        <SwitchTransition>
            <CSSTransition
                classNames={classNames}
                key={key}
                onEnter={onEnter}
                onEntered={onEntered}
                timeout={timeOut}
                onExited={onExited}
            >
                <>
                    {children}

                    <style jsx global>
                        {`
                    .page-enter {
                        opacity: 1;
                    }

                    .page-enter-active {
                        opacity: 1;
                        transition: opacity 400ms;
                    }

                    .page-exit {
                        opacity: 1;
                    }

                    .page-exit-active {
                        opacity: 1;
                        transition: opacity 400ms;
                    }

                    .project-page-enter {
                        opacity: 1;
                    }

                    .project-page-enter-active {
                        opacity: 1;
                        transition: opacity 400ms;
                    }

                    .project-page-exit:after {
                        content: "";
                        position: absolute;
                        bottom: -200rem;
                        left: 0;
                        width: 100%;
                        background: yellow;
                        transform: scaleY(1.5);
                        height: 100%;
                        border-bottom-left-radius: 30px;
                        border-bottom-right-radius: 30px;
                        transition: all 950ms cubic-bezier(1.000, 0.030, 0.440, 1.000);
                        z-index: 9999;
                    }

                    .project-page-exit-active:after {
                        bottom: 200rem;
                    }
                    `}
                    </style>
                </>
            </CSSTransition>
        </SwitchTransition>
    )
}

export default TransitionLayout
