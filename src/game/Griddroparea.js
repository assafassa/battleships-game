// GridDropArea.js

import React, { useState } from 'react';
import { DndProvider, useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const DraggableItem = ({ id, text }) => {
  const [, drag] = useDrag({
    item: { type: 'item', id, text },
  });

  return (
    <div ref={drag} style={{ border: '1px solid #000', padding: '8px', backgroundColor: '#eee', cursor: 'move' }}>
      {text}
    </div>
  );
};

const GridDropArea = () => {
  const [layout, setLayout] = useState([
    { i: 'image1', x: 0, y: 2, w: 1, h: 1 },
    { i: 'image2', x: 1, y: 4, w: 1, h: 1 },
    { i: 'image3', x: 2, y: 6, w: 1, h: 1 },
  ]);

  return (
    <DndProvider backend={HTML5Backend}>
      <GridLayout
        className="layout"
        layout={layout}
        cols={10}
        rows={10}  // Set the number of rows
        colWidth= {50}
        rowHeight={50}
        width={500}
        margin={[10, 10]}
        isResizable={false}
      >
        {layout.map((item) => (
          <div key={item.i} style={{ border: '1px solid #000', padding: '8px', backgroundColor: '#eee' }}>
            {item.i}
          </div>
        ))}
        <DraggableItem id="image1" text="Image 1" />
        <DraggableItem id="image2" text="Image 2" />
        <DraggableItem id="image3" text="Image 3" />
      </GridLayout>
    </DndProvider>
  );
};

export default GridDropArea;