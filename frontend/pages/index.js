import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home - ForsakenIdol</title>
        <meta name="description" content="An application developed by me!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>

        <div className={styles.splash}>
          <nav className={styles.navbar}>
            <p>Le Navbar Oui Oui Oui</p>
          </nav>
          <div className={styles.splash_focus}>
            <h1>Forsaken Idol</h1>
            <p className={styles.emphasis}>Sample text 123</p>
          </div>
        </div>

        <div class={styles.bio}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed nulla varius, vulputate lectus at, ornare tortor. Mauris non malesuada elit. Aliquam vulputate sapien in lorem tristique ultrices. Nullam porttitor turpis ac varius tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras vitae eros vel ex gravida bibendum. Quisque venenatis consequat tempor. Curabitur suscipit diam ac vehicula iaculis. Vivamus quis nibh pellentesque dui mollis semper in quis purus. Phasellus quis rutrum est. Suspendisse iaculis non quam a malesuada. Ut dignissim sit amet est aliquet elementum. Pellentesque sed enim mollis, pretium enim vitae, efficitur sem. Suspendisse in augue euismod, viverra turpis eget, rhoncus nunc.</p>
          <p>Mauris porttitor congue sollicitudin. Curabitur metus sapien, sagittis quis suscipit sed, convallis vel nibh. Nullam tincidunt pharetra rutrum. Quisque vel diam eget lorem consectetur porttitor eu a felis. Cras laoreet convallis augue, ut vulputate sem placerat quis. Phasellus dignissim elit nec leo interdum egestas. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras condimentum ultrices dolor, sit amet ullamcorper tortor. In eu scelerisque eros. Phasellus volutpat molestie eleifend. Quisque a facilisis diam, et luctus est. Nunc enim augue, malesuada in rutrum a, posuere sit amet leo.</p>
          <p>Morbi dictum consectetur risus quis tincidunt. Vivamus risus augue, facilisis sit amet gravida eget, molestie nec risus. Integer metus libero, egestas malesuada nulla non, sodales finibus lectus. Duis a dolor ultrices, auctor enim quis, porta nunc. In ut rhoncus est. Donec posuere quam tellus, id condimentum nisi varius at. Etiam pulvinar scelerisque urna, et ornare eros feugiat non. Nulla pulvinar, urna quis venenatis congue, odio dui dictum lectus, eget eleifend metus metus vel elit.</p>
          <p>Proin ex leo, porttitor mollis lorem vitae, imperdiet hendrerit nulla. Nullam auctor, leo in pellentesque interdum, ipsum augue molestie mauris, at tempor magna est et sapien. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec semper malesuada lorem, et imperdiet ligula aliquam ut. Proin consequat aliquam sem a sodales. Aenean eleifend vel ex non semper. Phasellus nulla lorem, pellentesque sed efficitur id, vulputate vitae odio. Duis gravida purus a eros tincidunt dapibus. Morbi nibh lorem, ultrices id augue a, scelerisque euismod metus. Nulla quis lacinia arcu, pharetra imperdiet diam. In tincidunt vehicula lorem non condimentum. Morbi sit amet mi sit amet orci imperdiet hendrerit. Aliquam a enim id leo sodales cursus sed ac nulla. Integer hendrerit accumsan accumsan. Ut mauris ex, vestibulum a mattis ac, tincidunt a felis. Fusce ac enim id tellus elementum eleifend.</p>
          <p>Maecenas gravida massa turpis, eget vehicula lorem molestie porta. Fusce cursus ligula ac vestibulum tristique. Vivamus eu leo lorem. Proin consequat eget velit quis egestas. Ut auctor, orci vel facilisis volutpat, purus metus fringilla dui, id sagittis metus tellus id metus. Mauris nunc justo, dictum sed facilisis a, elementum suscipit massa. Curabitur rutrum velit in odio pellentesque viverra. Maecenas id diam tristique, molestie nunc in, dapibus quam. Suspendisse fermentum lorem eget dolor placerat suscipit. Suspendisse in dolor varius mauris gravida pharetra. Nam finibus at leo vitae faucibus. Aliquam sed eros velit.</p>
        </div>

        <footer>
          See you later aligator!
        </footer>

      </body>
    </div>
  )
}
