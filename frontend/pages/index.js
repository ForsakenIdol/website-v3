import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export async function getServerSideProps() {

  const zen = await fetch("https://api.github.com/zen");
  const data = await zen.text();

  // Retrieve GitHub project data
  const test_string = "http://" + process.env.DB_SERVER + ":" + process.env.SERVER_PORT + "/get";
  try {
    const github = await fetch(test_string);
    const github_data = await github.json();
    return { props: { zen: data, github: github_data } }
  } catch (error) {
    return { props: { zen: data, github: null } }
  }

  
}

export default function Home({ zen, github }) {
  return (
    <div>
      <Head>
        {/* Anything within the <Head> element will be shifted to the <head> element by Next.js. */}
        <title>Home - ForsakenIdol</title>
        <meta name="description" content="An application developed by me!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* No <body> tags here. The entire parent <div> element already renders inside the <body> tag. */}
      <div className={styles.splash}>

        <nav className={styles.navbar}>
          <ul className={styles.navbar_list}>
            <li><a href="#">Home</a></li>
            <li><a href="#bio">About</a></li>
            <li><a href="#projects">Projects</a></li> {/* List of GitHub Projects (possibly with featured projects display) */}
            <li><a href="#stack">Stack</a></li> {/* Stack used to create the website with explanations as to why */}
            <li><a href="#follow">Follow</a></li>
          </ul>
        </nav>

        <div className={styles.splash_focus}>
          <h1>Forsaken Idol</h1>
          <p className={styles.emphasis}>Developer | Educator | Musician | Gamer</p>
        </div>

        <div className={styles.navigate_to_content}>
          <a href="#bio">
            <Image src="/down-arrow.svg" height={50} width={50} />
          </a>
        </div>

      </div>

      <div className={styles.bio} id="bio">
        <h2>About Me</h2>
        <hr color='white' />
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed nulla varius, vulputate lectus at, ornare tortor. Mauris non malesuada elit. Aliquam vulputate sapien in lorem tristique ultrices. Nullam porttitor turpis ac varius tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras vitae eros vel ex gravida bibendum. Quisque venenatis consequat tempor. Curabitur suscipit diam ac vehicula iaculis. Vivamus quis nibh pellentesque dui mollis semper in quis purus. Phasellus quis rutrum est. Suspendisse iaculis non quam a malesuada. Ut dignissim sit amet est aliquet elementum. Pellentesque sed enim mollis, pretium enim vitae, efficitur sem. Suspendisse in augue euismod, viverra turpis eget, rhoncus nunc.</p>
        <p>Mauris porttitor congue sollicitudin. Curabitur metus sapien, sagittis quis suscipit sed, convallis vel nibh. Nullam tincidunt pharetra rutrum. Quisque vel diam eget lorem consectetur porttitor eu a felis. Cras laoreet convallis augue, ut vulputate sem placerat quis. Phasellus dignissim elit nec leo interdum egestas. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras condimentum ultrices dolor, sit amet ullamcorper tortor. In eu scelerisque eros. Phasellus volutpat molestie eleifend. Quisque a facilisis diam, et luctus est. Nunc enim augue, malesuada in rutrum a, posuere sit amet leo.</p>
        <p>Morbi dictum consectetur risus quis tincidunt. Vivamus risus augue, facilisis sit amet gravida eget, molestie nec risus. Integer metus libero, egestas malesuada nulla non, sodales finibus lectus. Duis a dolor ultrices, auctor enim quis, porta nunc. In ut rhoncus est. Donec posuere quam tellus, id condimentum nisi varius at. Etiam pulvinar scelerisque urna, et ornare eros feugiat non. Nulla pulvinar, urna quis venenatis congue, odio dui dictum lectus, eget eleifend metus metus vel elit.</p>
        <hr color='white' />
      </div>

      <div className={styles.projects} id="projects">
        <h2>My Projects</h2>
        <p>Take a look at what I'm currently working on.</p>
        <hr color='white' />

        <p>{ github ? github.response.rows[0].description : "Could not load GitHub user data. Try again later." }</p>

        <hr color='white' />
      </div>

      <footer>
        <ul className={styles.footer_list}>
          <li><p>ForsakenIdol 2022</p></li>
          <li><p>{ zen }</p></li>
          <li><a href="#">Back to Top</a></li>
        </ul>
      </footer>

    </div>
  )
}
