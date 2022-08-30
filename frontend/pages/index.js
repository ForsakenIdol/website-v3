import Head from 'next/head'
import Image from 'next/image' /* The "Image" element optimises image loading. */
import Script from 'next/script' /* The "Script" element optimises JS script loading. */
import styles from '../styles/Home.module.css'

export async function getServerSideProps() {

  const zen = await fetch("https://api.github.com/zen");
  const data = await zen.text();

  // Retrieve GitHub project data
  const github_string = "http://" + process.env.DB_SERVER + ":" + process.env.SERVER_PORT + "/get";
  try {
    const github = await fetch(github_string);
    const github_data = await github.json();
    return { props: { zen: data, github: github_data } }
  } catch (error) {
    return { props: { zen: data, github: null } }
  }
  
}

function print_repo_data(github) {
  if (!github) return [
    <p></p>, <p></p>, <p>Could not load GitHub user data. Try again later.</p>
  ];
  let elements = []
  for (let i = 0; i < github.response.rows.length; i++) {
    // Skip private repositories
    if (github.response.rows[i].private) continue;
    /* ID, Name, Description, URL */
    elements.push(<p>{github.response.rows[i].repo_id}</p>);
    elements.push(<p>{github.response.rows[i].repo_name}</p>);
    elements.push(<p>{github.response.rows[i].description}</p>);
    elements.push(<a href={github.response.rows[i].url} target="_blank">Link</a>);
  }
  return elements;
}

export default function Home({ zen, github }) {

  const socialIconWidth = 30;
  const socialIconHeight = 30;

  return (
    <div>
      <Head>
        {/* Anything within <Head> will be shifted to the <head> element by Next.js. */}
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
            <li><a href="#follow">Connect</a></li>
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

        <div className={styles.projects_grid}>
        {/* ID, Name, Description, URL */}
          <b>Repo ID</b>
          <b>Repo Name</b>
          <b>Repo Description</b>
          <b>Repo URL</b>
          <hr color='white' /><hr color='white' /><hr color='white' /><hr color='white' />
          {print_repo_data(github)}
        </div>

        <hr color='white' />
      </div>

      <div className={styles.stack} id="stack">
        <h2>Stack</h2>
        <p>The technologies and frameworks that power this website.</p>
      </div>

      <div className={styles.connect} id="connect">
        <h2>Connect With Me</h2>
        <a href="#"><Image src="/social/github.svg" height={socialIconHeight} width={socialIconWidth} /></a>
        <a href="#"><Image src="/social/instagram.svg" height={socialIconHeight} width={socialIconWidth} /></a>
        <a href="#"><Image src="/social/youtube.svg" height={socialIconHeight} width={socialIconWidth} /></a>
        <a href="#"><Image src="/social/twitch.svg" height={socialIconHeight} width={socialIconWidth} /></a>
      </div>

      <Script src="/script.js" />

      <footer>
        <ul className={styles.footer_list}>
          <li><p>© ForsakenIdol, 2023</p></li>
          <li><p>{ zen }</p></li>
          <li><a href="#">Back to Top</a></li>
        </ul>
      </footer>

    </div>
  )
}
