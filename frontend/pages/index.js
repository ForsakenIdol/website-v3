import Head from 'next/head'
import Image from 'next/image' /* The "Image" element optimises image loading. */
import Script from 'next/script' /* The "Script" element optimises JS script loading. */
import styles from '../styles/Home.module.css'
//import Typewriter from 'typewriter-effect/dist/core'
import Typewriter from 'typewriter-effect'

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
    // Key props so React.js doesn't scream at me
    let key_props = [1000000000 + github.response.rows[i].repo_id, 2000000000 + github.response.rows[i].repo_id,
                     3000000000 + github.response.rows[i].repo_id, 4000000000 + github.response.rows[i].repo_id]
    // Skip private repositories
    if (github.response.rows[i].private) continue;
    /* ID, Name, Description, URL */
    elements.push(<p key={key_props[0]}>{github.response.rows[i].repo_id}</p>);
    elements.push(<p key={key_props[1]}>{github.response.rows[i].repo_name}</p>);
    elements.push(<p key={key_props[2]}>{github.response.rows[i].description}</p>);
    elements.push(<a key={key_props[3]} href={github.response.rows[i].url} target="_blank">Link</a>);
  }
  return elements;
}

function print_stack_items() {
  const content = [
    { "title": "database: postgresql", "image": "/stack/postgres.svg",
      "description": "Iteration 2 of my personal website had MySQL as the backend database for storing the old Blog and Login information. With iteration 3 (this iteration), I wanted to switch this part of the stack to something used frequently in production web apps - and so I came across PostgreSQL."},
    { "title": "middleware: express.js", "image": "/stack/node.svg",
      "description": "Express.js was key to the second iteration of my personal website, and I wanted to keep it in the stack in some form while still experimenting with other technologies. Ultimately, I settled for using Express in the middleware server, abstracting the database and exposing CRUD paths to the cronjob and frontend." },
    { "title": "cronjob: python", "image": "/stack/python.png",
      "description": "This website loads public repository data from the GitHub API. It's bad practise to call the API once for every visitor who comes to our site, so we need to pull the data from that API periodically and store it in our database. With both the middleware and frontend in JavaScript (Node.js), I opted for Python to write the cronjob to experiment in data handling (particularly datetime parsing) across different programming languages."},
    { "title": "frontend: next.js", "image": "/stack/next.svg",
      "description": "I've had my eye on Next.js for some time now as an alternative to React.js in general and the Express.js / Nunjucks templating stack that formed most of my previous website's iteration. It's a little overkill for a single-page web application, but it's well worth the effort put into learning how this framework operates."}
  ];

  const img_size = 100;
  let key_start = 98765;
  const elements = content.map(e => {
    return (
      <div className={styles.stack_item} key={key_start++}>
        <h3>{e.title}</h3>
        <Image src={e.image} height={img_size} width={img_size} />
        <p>{e.description}</p>
      </div>
    );
  });

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
            <li><a href="#connect">Connect</a></li>
          </ul>
        </nav>

        <div className={styles.splash_focus}>
          <h1>
            <Typewriter onInit={ typewriter => {typewriter.changeDelay(100).typeString('Forsaken Idol').start();} }/>
          </h1>
          <p className={styles.emphasis} id="splash-emphasis">
            Developer | Educator | Musician | Gamer
          </p>
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
        <b>Welcome to my portion of the internet.</b>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed nulla varius, vulputate lectus at, ornare tortor. Mauris non malesuada elit. Aliquam vulputate sapien in lorem tristique ultrices. Nullam porttitor turpis ac varius tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras vitae eros vel ex gravida bibendum. Quisque venenatis consequat tempor. Curabitur suscipit diam ac vehicula iaculis. Vivamus quis nibh pellentesque dui mollis semper in quis purus. Phasellus quis rutrum est. Suspendisse iaculis non quam a malesuada. Ut dignissim sit amet est aliquet elementum. Pellentesque sed enim mollis, pretium enim vitae, efficitur sem. Suspendisse in augue euismod, viverra turpis eget, rhoncus nunc.</p>
        <p>Mauris porttitor congue sollicitudin. Curabitur metus sapien, sagittis quis suscipit sed, convallis vel nibh. Nullam tincidunt pharetra rutrum. Quisque vel diam eget lorem consectetur porttitor eu a felis. Cras laoreet convallis augue, ut vulputate sem placerat quis. Phasellus dignissim elit nec leo interdum egestas. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras condimentum ultrices dolor, sit amet ullamcorper tortor. In eu scelerisque eros. Phasellus volutpat molestie eleifend. Quisque a facilisis diam, et luctus est. Nunc enim augue, malesuada in rutrum a, posuere sit amet leo.</p>
        <p>Morbi dictum consectetur risus quis tincidunt. Vivamus risus augue, facilisis sit amet gravida eget, molestie nec risus. Integer metus libero, egestas malesuada nulla non, sodales finibus lectus.</p>
        <hr color='white' style={{ marginBottom: "7vh" }}/>

        <div className={styles.navigate_to_content}>
          <a href="#projects">
            <Image src="/down-arrow.svg" height={50} width={50} />
          </a>
        </div>

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
        </div>
        <hr color='white' />
        <div className={styles.projects_grid}>
          {print_repo_data(github)}
        </div>
        <hr color='white' />

        <div className={styles.navigate_to_content}>
          <a href="#stack">
            <Image src="/down-arrow.svg" height={50} width={50} />
          </a>
        </div>
      </div>

      <div className={styles.stack} id="stack">
        <h2>Stack</h2>
        <p className={styles.emphasis} style={{ fontWeight: "bold" }} id="stack-emphasis">The technologies and frameworks that power this website.</p>
        <div className={styles.stack_grid}>
          {print_stack_items()}
        </div>
      </div>

      <div className={styles.connect} id="connect">
        <h2>Connect With Me</h2>
        <div className={styles.connect_links}>
          <a href="https://github.com/ForsakenIdol" target={"_blank"}><Image src="/social/github.svg" height={socialIconHeight} width={socialIconWidth} /></a>
          <a href="https://www.instagram.com/forsakenidol/"  target={"_blank"}><Image src="/social/instagram.svg" height={socialIconHeight} width={socialIconWidth} /></a>
          <a href="https://www.youtube.com/channel/UChezO9GdqhTIBN_JU2p35bQ" target={"_blank"}><Image src="/social/youtube.svg" height={socialIconHeight} width={socialIconWidth} /></a>
          <a href="https://www.twitch.tv/forsakenidol" target={"_blank"}><Image src="/social/twitch.svg" height={socialIconHeight} width={socialIconWidth} /></a>
        </div>
      </div>

      {/* JS Scripts */}
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
