import Head from 'next/head'
import Image from 'next/image' /* The "Image" element optimises image loading. */
import Script from 'next/script' /* The "Script" element optimises JS script loading. */
import styles from '../styles/Home.module.css'
//import Typewriter from 'typewriter-effect/dist/core'
import Typewriter from 'typewriter-effect'

/*
 * Environment Variables:
 * DB_SERVER: Hostname of database server
 * SERVER_PORT: Port of database server
 */

export async function getServerSideProps() {

  // Retrieve GitHub Zen
  const zen = await fetch("https://api.github.com/zen");
  // Retrieve GitHub project data
  const github_string = "http://" + process.env.DB_SERVER + ":" + process.env.SERVER_PORT + "/get";
  try {
    let data = await zen.text();
    // If the first character is "{", it means I've been rate limited to the zen API endpoint.
    if (data.charAt(0) == "{") data = "Zero Bootstrap and zero client-sided JavaScript.";
    try {
      const github = await fetch(github_string);
      const github_data = await github.json();
      return { props: { zen: data, github: github_data } }
    } catch (error) {
      return { props: { zen: data, github: null } }
    }
  } catch (error) {
    const data = "Zero Bootstrap and zero client-sided JavaScript.";
    try {
      const github = await fetch(github_string);
      const github_data = await github.json();
      return { props: { zen: data, github: github_data } }
    } catch (error) {
      return { props: { zen: data, github: null } }
    }
  }
}

function print_navlinks() {
  const content = [
    { "text": "Home", "link": "#" },
    { "text": "About", "link": "#bio" },
    { "text": "Projects", "link": "#projects" },
    { "text": "Stack", "link": "#stack" },
    { "text": "Connect", "link": "#connect" }
  ];
  let key_start = 78765;
  const elements = content.map(e => {
    return (
    <li key={key_start++}>
      <a href={e.link}>
        {e.text}
      </a>
    </li>
    );
  });
  return elements;
}

function print_repo_data(github) {
  if (!github) return [
    <p key={68765}></p>, <p key={68766}></p>, <p key={68767}>Could not load GitHub user data. Try again later.</p>
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
    elements.push(<a key={key_props[3]} href={github.response.rows[i].url} target="_blank" rel='noreferrer'>Link</a>);
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
        <Image src={e.image} height={img_size} width={img_size} alt="Stack item" />
        <p>{e.description}</p>
      </div>
    );
  });

  return elements;
}

function print_social_icons() {
  const socialIconWidth = 45;
  const socialIconHeight = 45;
  const content = [
    { "href": "https://github.com/ForsakenIdol", "img": "github.svg" },
    { "href": "https://www.instagram.com/forsakenidol/", "img": "instagram.svg" },
    { "href": "https://www.youtube.com/channel/UChezO9GdqhTIBN_JU2p35bQ", "img": "youtube.svg" },
    { "href": "https://www.twitch.tv/forsakenidol", "img": "twitch.svg" }
  ];
  let key_start = 88765;
  const elements = content.map(e => {
    return (<a href={e.href} target={"_blank"} rel='noreferrer' key={key_start++}><Image src={"/social/" + e.img} height={socialIconHeight} width={socialIconWidth} alt="social icon" /></a>);
  });
  return elements;

}

export default function Home({ zen, github }) {

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
            {print_navlinks()}
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
            <Image src="/down-arrow.svg" height={50} width={50} alt="down arrow" />
          </a>
        </div>

      </div>

      <div className={styles.bio} id="bio">
        <div className={styles.bio_content}>
          <h2>About Me</h2>
          <hr color='white' />
          <b>Welcome to my portion of the internet.</b>
          <p>I'm an amateur web developer, cloud computing engineer, freelance educator, musician, and hardcore gamer, all rolled up into 1 person - me! Over the last few years, I've been fortunate enough to travel the world, meet some incredible people, and develop a wide range of different experiences. Now, I work for Amazon Web Services in Australia, as a Cloud Support Engineer in the Container Deployment profile.</p>
          <p>This is iteration 3 of my personal website. You may have seen iteration 1, which was created in Squarespace and used to be available at forsakenidol.me, and iteration 2, which used to be the website at this address - forsakenidol.com. I designed iteration 2 to both cut down on hosting costs and ride the "Web Dev High" that I had back in mid-2020, after completing the first web development unit of my Computer Science degree. Unfortunately, I didn't make a lot of good choices during the design and development process of that iteration, used way too much bootstrap CSS and JavaScript, and there are now a lot of bugs that cannot be reproduced, which is why I wanted to start again from scratch with iteration 3 - no bootstrap, and no client-side scripts.</p> 
          <p>This entire website runs in a framework known as Kubernetes, which is an open-source container orchestration system that I've been interested in learning for some time. There are 4 different kinds of pods, each housing a single container representing a different part of the tech stack of this website. With iteration 3, I wanted to focus on building my understanding of web development by shifting from the monolithic architecture of iteration 2, to a microservices architecture for the current iteration. This would help me develop different parts of the stack separately and make it easier to adopt a Kubernetes hosting solution.</p>
          <hr color='white' style={{ marginBottom: "7vh" }}/>
        </div>

        <div className={styles.navigate_to_content}>
          <a href="#projects">
            <Image src="/down-arrow.svg" height={50} width={50} alt="down arrow" />
          </a>
        </div>

      </div>

      <div className={styles.projects} id="projects">
        <h2>My Projects</h2>
        <p>Take a look at what I'm currently working on. Check out my <a href='https://github.com/ForsakenIdol' target={'_blank'} rel="noreferrer">Github</a> for everything else!</p>

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
            <Image src="/down-arrow.svg" height={50} width={50} alt="down arrow" />
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
          {print_social_icons()}
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
