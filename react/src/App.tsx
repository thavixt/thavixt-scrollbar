import { useEffect, useRef, useState } from 'react'
import { useScrollbar } from '../lib'

function getCurrentColorScheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

const demoSize = 500;
const demoStyles: React.CSSProperties = {
  // padding: 8,
  border: '1px solid gray',
  borderRadius: 8,
  width: demoSize,
  height: demoSize,
  overflow: 'hidden',
  // overflow: 'hidden' to hide the initial flicker while the initialization happens
  position: 'relative'
};
const demoSentence = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis et quasi vero iusto debitis, magnam fugiat fuga ipsa tempore laborum incidunt ut, laboriosam, corrupti voluptatum in. Cumque, debitis soluta. Perferendis.';

function App() {
  const [colorScheme, setColorScheme] = useState<'dark' | 'light'>(getCurrentColorScheme());
  const [count, setCount] = useState(40);
  const [logs, setLogs] = useState<{ log: string; ts: string }[]>([]);

  const ref = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const scrollbar = useScrollbar(ref, {
    // onScroll: () => {
    //   console.log('onScroll')
    // },
    onScrollToEnd: (thresholds) => {
      // console.log('onScrollToEnd', thresholds)
      let direction = '';
      if (thresholds.top) {
        direction += ' top';
      }
      if (thresholds.bottom) {
        direction += ' bottom';
      }
      if (thresholds.left) {
        direction += ' left';
      }
      if (thresholds.right) {
        direction += ' right';
      }
      if (!direction.length) {
        return;
      }
      const log = `Scrolled to ${direction}`;
      setLogs(logs => [{ log, ts: new Date().toJSON() }, ...logs]);
    },
    // styles: {
    //   height: 10,
    //   width: 10,
    //   thumbColor: 'blue',
    //   thumbHoverColor: 'green',
    //   trackColor: 'gray',
    // }
  });

  useEffect(() => {
    document.body.style.colorScheme = colorScheme;
  }, [colorScheme]);

  return (
    <>
      <div className='row'>
        <button onClick={() => setColorScheme((current) => current === 'dark' ? 'light' : 'dark')}>
          change color scheme to {colorScheme === 'dark' ? 'light' : 'dark'}
        </button>
        <div className='row'>
          <label htmlFor="count">Demo sentences:</label>
          <input style={{ width: 96 }} type="number" id="count" min={1} value={count} onChange={(e) => setCount(+e.target.value)} />
        </div>
      </div>

      <div>
        <div className='row'>
          <button onClick={() => setLogs([])}>clear</button>
          <p>Logs: ({logs.length})</p>
        </div>
        <div style={{ height: 100, overflow: 'auto' }}>
          {logs.map((entry) => (
            <code key={entry.ts} style={{ display: 'block' }}>${entry.ts} - {entry.log}</code>
          ))}
        </div>
      </div>

      <p>Demo:</p>
      <div
        className='demo'
        // data-animating="top"
        // data-animating="bottom"
        // data-animating="left"
        // data-animating="right"
        style={demoStyles}
        ref={ref}
        id="demoId"
      >
        <div style={{ padding: 8 }}>
          <span>Lost of placeholder text incoming ...</span>
          <p style={{ width: '200%' }}>
            {demoSentence.repeat(count)}
          </p>
        </div>
      </div>

    </>
  )
}

export default App
