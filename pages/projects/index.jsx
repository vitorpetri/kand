import Head from 'next/head'
import Link from 'next/link'

import styles from './styles.module.sass'

import Gallery from '@/components/Gallery/index'
import SeparatorLine from '@/components/SeparatorLine'
import Line from '@/components/Line'

import { createClient } from '../../prismicio'
import sm from '../../sm.json'

export default function Home({projectsList}) {
  return (
    <>
      <Head>
        <title>KAND | All projects </title>
      </Head>
      
      <div className={styles.wrapper}>
        <h1 className={styles.title}>All Projects</h1>
        <div className={styles.line}><Line /></div>
        <SeparatorLine />
        <Gallery projectsList={projectsList} />
        <SeparatorLine />
        <span className={styles.footer__label}>or choose by</span>
        <Link 
          href={'/categories'}
          className={styles.footer__title}
        >Categories</Link>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const client = createClient({ accessToken: sm.token })
  const projects = await client.getAllByType('project')

  const projectsListTreated = projects.map((project) => {
    if (!project.data) return null
    return {
      id: project.uid,
      title: project.data.title,
      content: project.data.content,
      cover: project.data.cover,
    }
  })

  const orderReq = await client.getByType('order')
  const order = orderReq.results[0].data.list_order.map((item) => item.project).map((item) => item.uid)

  let projectsList = []

  order.forEach((item) => {
    const found = projectsListTreated.find((acc) => acc?.id === item)
    if (found) projectsList.push(found)
  })

  return {
    props: { projectsList, order }
  }
}