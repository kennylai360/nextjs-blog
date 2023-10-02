import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head'
import Date from '../../components/dates'
import utilStyles from '../../styles/utils.module.css'


// Display what we have on the page
export default function Post({postData}) {
    return (
        <Layout>
          <Head>
            <title>{postData.title}</title>
          </Head>
          <article>
            <h1 className={utilStyles.headingXl}>{postData.title}</h1>
            <div className={utilStyles.lightText}>
              <Date dateString={postData.date} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
          </article>
        </Layout>
      );
}


// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths
export async function getStaticPaths() {
    // getAllPostIds which reads the directory and then using map to return a list of ids 
    // using the filename without the extension of the file.
    const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

// Once we have 
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}