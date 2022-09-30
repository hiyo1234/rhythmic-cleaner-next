import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import * as constVars from '../component/constVars'
import * as phinaClasses from '../component/phinaClasses'
import * as utils from '../component/utils'

const Home: NextPage = () => {

  useEffect(() => {
    phina.globalize();
    if(!phina.util.Support.webAudio) {
      alert('webAudioに対応していません！最新のブラウザを使って下さい！');
    }

    utils.deviceMotionRequest();
    phinaClasses.setPhina();
    phina.main(function() {
      const app = GameApp({
          query: "#canvasId",
          fit: true,
          assets: constVars.ASSETS,
          width: constVars.SCREEN_WIDTH,
          height: constVars.SCREEN_HEIGHT,
          startLabel: 'title',
          backgroundColor: 'black',
          fps: 60,
          scenes: [
            {
              className: 'TitleScene',
              label: 'title',
            },
            {
              className: 'PlayMethodScene',
              label: 'playMethod',
              nextLabel: 'title',
            },
            {
              className: 'SelectMusicScene',
              label: 'selectMusic',
              nextLabel: 'main',
            },
            {
              className: 'MainScene',
              label: 'main',
              nextLabel: 'result',
            },
            {
              className: 'ResultScene2',
              label: 'result',
              nextLabel: 'title',
            },
          ]
      });
      // fpsの表示
      // app.enableStats();
      app.run();
    });
  },[]);

  return (
    <>
      <Head>
        <title>リズム De! 掃除機</title>
        <meta name="description" content="This is the work We presented at GEEKTEN(2021)" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main>
        <canvas id="canvasId"></canvas>
        <script src="https://cdn.jsdelivr.net/gh/phinajs/phina.js@v0.2.3/build/phina.js"></script>
      </main>
    </>
  )
}

export default Home
