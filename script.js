////////////////////////////////////////////////////////////////////////////////
// GEOMETRY SECTION USING p5.js -- 18 LESSONS (Navigation Fixed)
////////////////////////////////////////////////////////////////////////////////

// Track the current p5 sketch so we can remove it when changing pages.
// Variables for tracking pages
let currentP5Sketch = null;
let currentAlgebraPage = 0;
let currentGeometryPage = 0;

// Define all 18 lessons
const geometryPages = [

  {
    title: "Formes 3D i les seves Propietats",
    content: `
      <h2 class="section-title">Formes 3D i les seves Propietats</h2>
      <div class="explanation" style="max-width:750px; margin:auto; text-align:left; font-size:16px; line-height:1.6;">
        <p>Les formes tridimensionals (<strong>3D</strong>) tenen <strong>longitud</strong>, <strong>amplada</strong> i <strong>alçada</strong>. Entendre aquestes formes ajuda en arquitectura, disseny i la vida quotidiana.</p>
        <ul>
          <li><strong>Cub:</strong> 6 cares quadrades, 12 arestes, 8 vèrtexs.</li>
          <li><strong>Esfera:</strong> Sense arestes ni vèrtexs; perfectament rodona.</li>
          <li><strong>Con:</strong> Base circular i un vèrtex punxegut.</li>
          <li><strong>Cilindre:</strong> Dues cares circulars i una superfície corba.</li>
          <li><strong>Tor:</strong> Forma de rosquilla.</li>
        </ul>
        <p><strong>Instruccions:</strong> Selecciona una forma i utilitza el ratolí per girar-la i explorar-la!</p>
      </div>
  
      <div style="text-align:center; margin:15px;">
        <label style="font-size:1.1rem;">Selecciona Forma: </label>
        <select id="shapeSelect" style="font-size:1rem; padding:5px; border-radius:6px; margin-left:10px;">
          <option value="box">Cub</option>
          <option value="sphere">Esfera</option>
          <option value="cone">Con</option>
          <option value="cylinder">Cilindre</option>
          <option value="torus">Tor</option>
        </select>
      </div>
  
      <div id="p5-container" style="border:2px solid #3b82f6; border-radius:10px; max-width:800px; width:100%; margin:auto; position:relative; overflow:hidden;"></div>
      <button class="next-btn" onclick="nextGeometryPage()">Següent</button>
    `,
    action: () => {
      if (window.currentP5Sketch) window.currentP5Sketch.remove();

      const shapeSelect = document.getElementById("shapeSelect");
      const container = document.getElementById("p5-container");

      const sketch = (p) => {
        let angle = 0;

        p.setup = () => {
          const width = container.offsetWidth;
          const canvas = p.createCanvas(width, 450, p.WEBGL);
          canvas.parent("p5-container");
          p.pixelDensity(1); // Evita desbordaments en pantalles d'alta resolució
        };

        p.windowResized = () => {
          p.resizeCanvas(container.offsetWidth, 450); // Ajusta el canvas en redimensionar
        };

        p.draw = () => {
          p.background(245);
          p.orbitControl(); // Permet rotació amb el ratolí

          p.push();
          p.rotateX(angle * 0.3);
          p.rotateY(angle * 0.3);

          p.ambientLight(150);
          p.directionalLight(255, 255, 255, 0.5, 1, -1);
          p.normalMaterial();

          const shape = shapeSelect.value;
          if (shape === "box") p.box(150);
          if (shape === "sphere") p.sphere(100, 40, 40);
          if (shape === "cone") p.cone(80, 150, 32);
          if (shape === "cylinder") p.cylinder(70, 150, 40);
          if (shape === "torus") p.torus(80, 30, 30, 30);

          p.pop();
          angle += 0.01;
        };
      };

      window.currentP5Sketch = new p5(sketch);

      shapeSelect.addEventListener("change", () => {
        window.currentP5Sketch.remove();
        window.currentP5Sketch = new p5(sketch);
      });
    },
  },


  {
    title: "Seccions Transversals de Formes 3D",
    content: `
      <h2 class="section-title">Seccions Transversals de Formes 3D</h2>
      <div class="explanation" style="max-width:750px; margin:auto; font-size:16px; line-height:1.6; text-align:left;">
        <p>Una <strong>secció transversal</strong> és la figura obtinguda en tallar un objecte 3D de forma recta. Segons com es talli la figura, la secció transversal canvia.</p>
        <p><strong>Exemples:</strong></p>
        <ul>
          <li><strong>Cub:</strong> Els talls poden formar quadrats o rectangles.</li>
          <li><strong>Cilindre:</strong> Tall paral·lel a la base → cercle; tall diagonal → el·lipse.</li>
          <li><strong>Con:</strong> Pot formar cercles, el·lipses, paràboles o triangles.</li>
          <li><strong>Esfera:</strong> Qualsevol tall és un cercle.</li>
        </ul>
        <p><strong>Instruccions:</strong> Selecciona una forma i mou el control lliscant per canviar la posició del tall. Gira la figura amb el ratolí per veure diferents perspectives.</p>
      </div>
  
      <div style="text-align:center; margin:15px;">
        <label style="font-size:1.1rem;">Selecciona Forma:</label>
        <select id="crossSectionShape" style="font-size:1rem; padding:5px; border-radius:6px; margin-left:10px;">
          <option value="cube">Cub</option>
          <option value="cylinder">Cilindre</option>
          <option value="cone">Con</option>
          <option value="sphere">Esfera</option>
        </select>
      </div>
  
      <div style="text-align:center; margin:15px;">
        <label style="font-size:1.1rem;">Posició del Tall:</label>
        <input type="range" id="slicePosition" min="-1" max="1" step="0.01" value="0" style="width:60%; margin-left:10px;">
      </div>
  
      <div id="p5-container" style="border:2px solid #3b82f6; border-radius:10px; max-width:800px; width:100%; margin:auto; overflow:hidden;"></div>
      <button class="next-btn" onclick="nextGeometryPage()">Següent</button>
    `,
    action: () => {
      if (window.currentP5Sketch) window.currentP5Sketch.remove();

      const shapeSelect = document.getElementById("crossSectionShape");
      const sliceSlider = document.getElementById("slicePosition");
      const container = document.getElementById("p5-container");

      const sketch = (p) => {
        let angle = 0;

        p.setup = () => {
          const width = container.offsetWidth;
          const canvas = p.createCanvas(width, 450, p.WEBGL);
          canvas.parent("p5-container");
          p.pixelDensity(1); // Millora la visualització en pantalles d'alta resolució
        };

        p.windowResized = () => {
          p.resizeCanvas(container.offsetWidth, 450); // Ajust dinàmic del canvas
        };

        p.draw = () => {
          const slice = p.map(sliceSlider.value, -1, 1, -150, 150);
          p.background(245);
          p.orbitControl();
          p.ambientLight(150);
          p.directionalLight(255, 255, 255, 0.5, 1, -1);

          p.push();
          p.rotateX(angle * 0.3);
          p.rotateY(angle * 0.3);

          // Pla transparent de tall
          p.push();
          p.translate(0, slice, 0);
          p.fill(248, 113, 113, 80);
          p.noStroke();
          p.plane(300, 300);
          p.pop();

          p.normalMaterial();

          const shape = shapeSelect.value;
          if (shape === "cube") p.box(200);
          if (shape === "cylinder") p.cylinder(100, 200, 40);
          if (shape === "cone") p.cone(100, 200, 40);
          if (shape === "sphere") p.sphere(130, 40, 40);

          p.pop();
          angle += 0.01;
        };
      };

      window.currentP5Sketch = new p5(sketch);

      shapeSelect.addEventListener("change", () => {
        window.currentP5Sketch.remove();
        window.currentP5Sketch = new p5(sketch);
      });

      sliceSlider.addEventListener("input", () => {
        window.currentP5Sketch.redraw();
      });
    },
  },


  {
    title: "Xarxes de Figures 3D",
    content: `
      <h2 class="section-title">Xarxes de Figures 3D</h2>
      <div class="explanation" style="max-width:750px; margin:auto; font-size:16px; line-height:1.6; text-align:left;">
        <p>Una <strong>xarxa</strong> és un patró 2D que es pot plegar per formar una figura 3D.</p>
        <p><strong>Per què són útils les xarxes?</strong></p>
        <ul>
          <li>Ajuda a entendre com es formen les figures 3D.</li>
          <li>S'utilitzen per calcular l'àrea de la superfície.</li>
          <li>Són pràctiques en el disseny del món real (ex.: caixes, llaunes).</li>
        </ul>
        <p><strong>Instruccions:</strong> Selecciona una figura i alterna entre la vista 3D i la seva xarxa desplegada. Utilitza el ratolí per girar la figura 3D o arrossegar la xarxa 2D.</p>
      </div>
  
      <div style="text-align:center; margin:15px;">
        <label style="font-size:1.1rem;">Selecciona la figura:</label>
        <select id="netShapeSelect" style="font-size:1rem; padding:5px; border-radius:6px; margin-left:10px;">
          <option value="cube">Cub</option>
          <option value="cylinder">Cilindre</option>
          <option value="cone">Con</option>
          <option value="pyramid">Piràmide</option>
        </select>
  
        <button id="toggleViewBtn" style="font-size:1rem; padding:8px 15px; border-radius:6px; background-color:#3b82f6; color:white; border:none; margin-left:15px; cursor:pointer;">
          Mostrar Xarxa
        </button>
      </div>
  
      <div id="p5-container" style="border:2px solid #3b82f6; border-radius:10px; max-width:800px; width:100%; margin:auto; overflow:hidden;"></div>
      <button class="next-btn" onclick="nextGeometryPage()">Següent</button>
    `,
    action: () => {
      if (window.currentP5Sketch) window.currentP5Sketch.remove();

      const shapeSelect = document.getElementById("netShapeSelect");
      const toggleBtn = document.getElementById("toggleViewBtn");
      let showNet = false;

      toggleBtn.addEventListener("click", () => {
        showNet = !showNet;
        toggleBtn.textContent = showNet ? "Mostrar Figura 3D" : "Mostrar Xarxa";
        window.currentP5Sketch.redraw();
      });

      const sketch = (p) => {
        p.setup = () => {
          const canvas = p.createCanvas(document.getElementById("p5-container").offsetWidth, 450, p.WEBGL);
          canvas.parent("p5-container");
          p.noLoop();
        };

        p.windowResized = () => {
          p.resizeCanvas(document.getElementById("p5-container").offsetWidth, 450);
        };

        p.draw = () => {
          p.background(245);
          p.orbitControl();
          p.ambientLight(180);
          p.directionalLight(255, 255, 255, 0.5, 1, -1);
          p.normalMaterial();

          const shape = shapeSelect.value;
          if (!showNet) {
            p.rotateX(-0.5);
            p.rotateY(0.8);
            draw3DShape(p, shape);
          } else {
            drawNet(p, shape);
          }
        };

        function draw3DShape(p, shape) {
          if (shape === "cube") p.box(150);
          if (shape === "cylinder") p.cylinder(70, 180, 40);
          if (shape === "cone") p.cone(80, 180, 40);
          if (shape === "pyramid") {
            p.push();
            p.rotateX(Math.PI / 4);
            p.rotateZ(Math.PI / 4);
            p.translate(0, -50, 0);
            p.cone(100, 150, 4);
            p.pop();
          }
        }

        function drawNet(p, shape) {
          p.resetMatrix();
          p.translate(-p.width / 4, -p.height / 4);
          p.fill(96, 165, 250, 150);
          p.stroke(59, 130, 246);
          p.strokeWeight(2);

          if (shape === "cube") {
            for (let i = -1; i <= 1; i++) p.rect(100 * i, 100, 100, 100);
            p.rect(0, 0, 100, 100);
            p.rect(0, 200, 100, 100);
          }

          if (shape === "cylinder") {
            p.ellipse(150, 100, 100, 100);
            p.rect(100, 150, 100, 200);
            p.ellipse(150, 380, 100, 100);
          }

          if (shape === "cone") {
            p.arc(200, 200, 200, 200, 0, Math.PI * 1.5, p.PIE);
            p.ellipse(350, 200, 100, 100);
          }

          if (shape === "pyramid") {
            p.rect(200, 200, 100, 100);
            p.triangle(200, 200, 150, 100, 250, 200); // Superior
            p.triangle(200, 300, 150, 400, 250, 300); // Inferior
            p.triangle(200, 200, 100, 250, 200, 300); // Esquerra
            p.triangle(300, 250, 250, 200, 250, 300); // Dreta
          }
        }
      };

      window.currentP5Sketch = new p5(sketch);
      shapeSelect.addEventListener("change", () => window.currentP5Sketch.redraw());
    },
  },

  {
    title: "Formes Bàsiques i Noms",
    content: `
      <h2 class="section-title">1. Formes Bàsiques i Noms</h2>
      <div class="explanation">
        <p>Clica els botons per mostrar diferents formes i aprendre les seves propietats.</p>
        <ul style="text-align:left; max-width:600px; margin:auto;">
          <li><strong>Cercle:</strong> Forma rodona amb tots els punts equidistants del centre.</li>
          <li><strong>Quadrat:</strong> Quatre costats iguals i quatre angles rectes.</li>
          <li><strong>Triangle:</strong> Tres costats i tres angles.</li>
          <li><strong>Rectangle:</strong> Costats oposats iguals i quatre angles rectes.</li>
        </ul>
      </div>
  
      <div style="text-align:center; margin:20px 0;">
        <button class="shape-btn" onclick="showShape('circle')">Cercle</button>
        <button class="shape-btn" onclick="showShape('square')">Quadrat</button>
        <button class="shape-btn" onclick="showShape('triangle')">Triangle</button>
        <button class="shape-btn" onclick="showShape('rectangle')">Rectangle</button>
      </div>
  
      <div id="p5-container" style="border:2px solid #3b82f6; border-radius:10px; max-width:700px; margin:auto; padding:10px; box-sizing:border-box;"></div>
      <p id="shapeName" style="font-size:1.3rem; font-weight:bold; text-align:center; margin-top:15px;"></p>
      <button class="next-btn" onclick="nextGeometryPage()">Següent</button>
    `,
    action: () => {
      if (window.currentP5Sketch) window.currentP5Sketch.remove();

      let currentShape = "circle";

      window.showShape = (shape) => {
        currentShape = shape;
        const shapeDescriptions = {
          circle: "Un cercle no té cantonades i tots els punts estan a la mateixa distància del centre.",
          square: "Un quadrat té quatre costats iguals i quatre angles rectes.",
          triangle: "Un triangle té tres costats i la suma dels seus angles interiors és de 180°.",
          rectangle: "Un rectangle té costats oposats iguals i quatre angles rectes.",
        };
        document.getElementById("shapeName").textContent = `${shape.charAt(0).toUpperCase() + shape.slice(1)} - ${shapeDescriptions[shape]}`;

        if (window.currentP5Sketch) window.currentP5Sketch.redraw();
      };

      const shapeSketch = (p) => {
        p.setup = () => {
          const container = document.getElementById("p5-container");
          const c = p.createCanvas(container.offsetWidth - 20, 400);
          c.parent("p5-container");
          p.noLoop();
        };

        p.draw = () => {
          p.clear();
          p.background(240);
          p.fill(59, 130, 246, 80);
          p.stroke(59, 130, 246);
          p.strokeWeight(2);

          const cx = p.width / 2;
          const cy = p.height / 2;
          const size = Math.min(p.width, p.height) * 0.5;

          if (currentShape === "circle") p.circle(cx, cy, size);
          if (currentShape === "square") p.rect(cx - size / 2, cy - size / 2, size, size);
          if (currentShape === "triangle") {
            const base = size;
            const height = base * Math.sqrt(3) / 2;
            p.triangle(cx, cy - height / 2, cx - base / 2, cy + height / 2, cx + base / 2, cy + height / 2);
          }
          if (currentShape === "rectangle") p.rect(cx - size * 0.6, cy - size * 0.3, size * 1.2, size * 0.6);
        };

        window.addEventListener("resize", () => {
          const container = document.getElementById("p5-container");
          p.resizeCanvas(container.offsetWidth - 20, 400);
          p.redraw();
        });
      };

      window.currentP5Sketch = new p5(shapeSketch);
      showShape("circle");
    },
  },





  {
    title: "Comprensió dels Angles",
    content: `
      <h2 class="section-title">2. Comprensió dels Angles</h2>
      <div class="explanation" style="max-width:700px; margin:auto; text-align:left;">
        <p>Un <strong>angle</strong> es forma quan dos raigs comparteixen un punt comú, anomenat <strong>vèrtex</strong>.</p>
        <p>Els angles es mesuren en graus (°) i es poden classificar com a:</p>
        <ul>
          <li><strong>Angle agut:</strong> Menys de 90°</li>
          <li><strong>Angle recte:</strong> Exactament 90°</li>
          <li><strong>Angle obtús:</strong> Entre 90° i 180°</li>
          <li><strong>Angle pla:</strong> Exactament 180°</li>
          <li><strong>Angle reflex:</strong> Més de 180° però menys de 360°</li>
        </ul>
        <p><strong>Instruccions:</strong> Arrossega el punt blau per canviar l'angle. La mesura de l'angle s'actualitzarà en temps real.</p>
      </div>
  
      <div id="p5-container" style="margin-top:20px; border:2px solid #3b82f6; border-radius:8px; padding:10px; max-width:700px; margin:auto; box-sizing:border-box;"></div>
      <p id="angleType" style="font-size:1.2rem; font-weight:bold; margin-top:15px; text-align:center;"></p>
      <button class="next-btn" onclick="nextGeometryPage()">Següent</button>
  
      <style>
        .explanation ul {
          margin: 10px 0;
          padding-left: 20px;
        }
        .explanation li {
          margin: 5px 0;
          font-size: 16px;
        }
        #angleType {
          background-color: #f1f5f9;
          padding: 10px;
          border-radius: 6px;
          max-width: 400px;
          margin: 15px auto;
        }
      </style>
    `,
    action: () => {
      if (window.currentP5Sketch) window.currentP5Sketch.remove();

      const angleTypeDisplay = document.getElementById("angleType");

      const angleSketch = (p) => {
        let centerX, centerY, moverX, moverY, dragging = false;

        p.setup = function () {
          const container = document.getElementById("p5-container");
          const canvasWidth = container.offsetWidth - 20;
          const canvasHeight = 400;

          const canvas = p.createCanvas(canvasWidth, canvasHeight);
          canvas.parent("p5-container");

          centerX = p.width / 2;
          centerY = p.height / 2;
          moverX = centerX + 100;
          moverY = centerY - 60;

          p.noLoop();
        };

        p.draw = function () {
          p.clear();
          p.background(240);

          p.stroke(180);
          p.strokeWeight(3);
          p.line(centerX, centerY, centerX + 100, centerY);

          p.stroke(59, 130, 246);
          p.strokeWeight(3);
          p.line(centerX, centerY, moverX, moverY);

          p.fill(0);
          p.ellipse(centerX, centerY, 12, 12);
          p.fill(59, 130, 246);
          p.ellipse(moverX, moverY, 14, 14);

          const angle = Math.atan2(moverY - centerY, moverX - centerX);
          const degrees = ((angle * 180) / Math.PI + 360) % 360;

          p.noFill();
          p.stroke(255, 99, 71);
          p.strokeWeight(2);
          p.arc(centerX, centerY, 100, 100, 0, angle);

          p.fill(0);
          p.noStroke();
          p.textSize(16);
          p.textAlign(p.LEFT);
          p.text(`Angle = ${degrees.toFixed(1)}°`, 20, 30);

          const angleType =
            degrees === 0 || degrees === 360 ? "Angle zero" :
              degrees < 90 ? "Angle agut" :
                degrees === 90 ? "Angle recte" :
                  degrees < 180 ? "Angle obtús" :
                    degrees === 180 ? "Angle pla" :
                      "Angle reflex";

          angleTypeDisplay.textContent = `Tipus d'angle: ${angleType}`;
        };

        p.mousePressed = function () {
          if (p.dist(p.mouseX, p.mouseY, moverX, moverY) < 14) dragging = true;
        };

        p.mouseDragged = function () {
          if (dragging) {
            moverX = p.constrain(p.mouseX, 0, p.width);
            moverY = p.constrain(p.mouseY, 0, p.height);
            p.redraw();
          }
        };

        p.mouseReleased = function () {
          dragging = false;
        };

        window.addEventListener("resize", () => {
          const container = document.getElementById("p5-container");
          p.resizeCanvas(container.offsetWidth - 20, 400);
          centerX = p.width / 2;
          centerY = p.height / 2;
          p.redraw();
        });
      };

      window.currentP5Sketch = new p5(angleSketch);
    },
  },




  {
    title: "Mesura d'Angles amb un Transportador",
    content: `
      <h2 class="section-title">3. Mesura d'Angles amb un Transportador</h2>
      <div class="explanation" style="max-width:700px; margin:auto; text-align:left;">
        <p>Un <strong>transportador</strong> és una eina utilitzada per mesurar angles en graus.</p>
        <p><strong>Com mesurar un angle:</strong></p>
        <ul>
          <li>Col·loca el punt central del transportador al vèrtex de l'angle.</li>
          <li>Aligna un raig amb la línia base (marca de 0°).</li>
          <li>La escala on es troba l'altre raig indica la mesura de l'angle.</li>
        </ul>
        <p><strong>Instruccions:</strong> Arrossega el <span style="color:#3b82f6; font-weight:bold;">punt blau</span> per formar diferents angles. El transportador t'ajudarà a mesurar-los!</p>
      </div>
  
      <div id="p5-container" style="margin-top:20px; border:2px solid #3b82f6; border-radius:8px;"></div>
      <p id="angleDisplay" style="font-size:1.3rem; font-weight:bold; text-align:center; margin-top:15px;"></p>
      <button class="next-btn" onclick="nextGeometryPage()">Següent</button>
  
      <style>
        .explanation ul {
          margin: 10px 0;
          padding-left: 20px;
        }
        .explanation li {
          margin: 6px 0;
          font-size: 16px;
        }
        #angleDisplay {
          background-color: #f1f5f9;
          padding: 10px;
          border-radius: 6px;
          max-width: 400px;
          margin: 20px auto;
        }
      </style>
    `,
    action: () => {
      if (currentP5Sketch) currentP5Sketch.remove();

      const angleDisplay = document.getElementById("angleDisplay");

      let protractorSketch = function (p) {
        let centerX, centerY, moverX, moverY, dragging = false;

        p.setup = function () {
          const canvas = p.createCanvas(600, 450);
          canvas.parent("p5-container");
          centerX = p.width / 2;
          centerY = p.height / 2;
          moverX = centerX + 100;
          moverY = centerY - 60;
          angleDisplay.textContent = "Angle ≈ 60.0°";
        };

        p.draw = function () {
          p.background(245);

          p.noFill();
          p.stroke(50);
          p.strokeWeight(2);
          p.arc(centerX, centerY, 220, 220, Math.PI, 0);

          for (let angle = 0; angle <= 180; angle += 10) {
            let rad = p.radians(angle);
            let x1 = centerX + 110 * p.cos(Math.PI - rad);
            let y1 = centerY + 110 * p.sin(Math.PI - rad);
            let x2 = centerX + (angle % 30 === 0 ? 125 : 120) * p.cos(Math.PI - rad);
            let y2 = centerY + (angle % 30 === 0 ? 125 : 120) * p.sin(Math.PI - rad);

            p.strokeWeight(angle % 30 === 0 ? 2 : 1);
            p.line(x1, y1, x2, y2);

            if (angle % 30 === 0) {
              p.fill(0);
              p.noStroke();
              p.textSize(12);
              let labelX = centerX + 135 * p.cos(Math.PI - rad);
              let labelY = centerY + 135 * p.sin(Math.PI - rad);
              p.textAlign(p.CENTER, p.CENTER);
              p.text(`${angle}°`, labelX, labelY);
            }
          }

          p.stroke(180);
          p.strokeWeight(3);
          p.line(centerX, centerY, centerX + 100, centerY);

          p.stroke(59, 130, 246);
          p.strokeWeight(3);
          p.line(centerX, centerY, moverX, moverY);

          p.fill(0);
          p.ellipse(centerX, centerY, 12, 12);
          p.fill(59, 130, 246);
          p.ellipse(moverX, moverY, 14, 14);

          let angle = Math.atan2(moverY - centerY, moverX - centerX);
          let degrees = ((angle * 180) / Math.PI + 360) % 360;
          if (degrees > 180) degrees = 360 - degrees;

          angleDisplay.textContent = `Angle ≈ ${degrees.toFixed(1)}°`;

          p.noFill();
          p.stroke(255, 99, 71);
          p.strokeWeight(2);
          p.arc(centerX, centerY, 80, 80, 0, angle);
        };

        p.mousePressed = function () {
          if (p.dist(p.mouseX, p.mouseY, moverX, moverY) < 14) dragging = true;
        };

        p.mouseDragged = function () {
          if (dragging) {
            moverX = p.constrain(p.mouseX, 0, p.width);
            moverY = p.constrain(p.mouseY, 0, p.height);
          }
        };

        p.mouseReleased = function () {
          dragging = false;
        };
      };

      currentP5Sketch = new p5(protractorSketch);
    },
  },









  {
    title: "Angles en Polígons",
    content: `
      <h2 class="section-title">1. Angles en Polígons</h2>
      <div class="explanation" style="max-width:700px; margin:auto; text-align:left;">
        <p>Un <strong>polígon</strong> és una figura tancada formada per segments de línia recta. Cada punt de trobada de dos costats s’anomena <strong>vèrtex</strong>, i l’angle en aquest vèrtex és un <strong>angle interior</strong>.</p>
        <p>La fórmula per trobar cada angle interior d’un polígon regular és:</p>
        <p style="text-align:center; font-size:1.2rem; font-weight:bold;">Angle interior = ((n - 2) × 180°) ÷ n</p>
        <p>Utilitza el control lliscant següent per canviar el nombre de costats i observa com canvien el polígon i els seus angles interiors.</p>
      </div>
      <div style="text-align:center; margin:20px 0;">
        <label for="sidesSlider" style="font-size:1.1rem;">Nombre de costats:
          <span id="sidesDisplay" style="font-weight:bold; font-size:1.2rem;">3</span>
        </label><br/>
        <input type="range" id="sidesSlider" min="3" max="12" value="3" style="width:60%; margin-top:10px;"/>
      </div>
      <div id="p5-container" style="border:2px solid #3b82f6; border-radius:8px; margin-top:10px;"></div>
      <p id="angleInfo" style="font-size:1.2rem; font-weight:bold; text-align:center; margin-top:15px;"></p>
      <button class="next-btn" onclick="nextGeometryPage()">Següent</button>
  
      <style>
        .explanation p, .explanation li {
          font-size: 16px;
          line-height: 1.6;
        }
        #angleInfo {
          background-color: #f1f5f9;
          padding: 10px;
          border-radius: 6px;
          max-width: 400px;
          margin: 15px auto;
        }
      </style>
    `,
    action: () => {
      if (currentP5Sketch) currentP5Sketch.remove();

      const sidesSlider = document.getElementById("sidesSlider");
      const sidesDisplay = document.getElementById("sidesDisplay");
      const angleInfo = document.getElementById("angleInfo");

      let polygonSketch = function (p) {
        p.setup = function () {
          let c = p.createCanvas(600, 450);
          c.parent("p5-container");
        };

        p.draw = function () {
          p.background(245);
          const sides = parseInt(sidesSlider.value);
          sidesDisplay.textContent = sides;

          const interiorAngle = ((sides - 2) * 180) / sides;
          angleInfo.textContent = `Cada angle interior ≈ ${interiorAngle.toFixed(1)}°`;

          const centerX = p.width / 2;
          const centerY = p.height / 2;
          const radius = 150;

          p.fill(59, 130, 246, 60);
          p.stroke(59, 130, 246);
          p.strokeWeight(2);
          p.beginShape();
          const vertices = [];
          for (let i = 0; i < sides; i++) {
            const angle = p.TWO_PI * i / sides - p.HALF_PI;
            const x = centerX + radius * p.cos(angle);
            const y = centerY + radius * p.sin(angle);
            p.vertex(x, y);
            vertices.push({ x, y });
          }
          p.endShape(p.CLOSE);

          p.fill(0);
          p.textSize(12);
          vertices.forEach((v) => {
            p.ellipse(v.x, v.y, 8, 8);
            p.textAlign(p.CENTER, p.CENTER);
            p.text(`${interiorAngle.toFixed(0)}°`, v.x, v.y - 15);
          });
        };

        sidesSlider.addEventListener("input", () => {
          currentP5Sketch.redraw();
        });
      };

      currentP5Sketch = new p5(polygonSketch);
    },
  },



  {
    title: "Suma dels Angles Interiors",
    content: `
      <h2 class="section-title">2. Suma dels Angles Interiors</h2>
      <div class="explanation" style="max-width:700px; margin:auto; text-align:left;">
        <p>La <strong>suma de tots els angles interiors</strong> d’un <strong>polígon de n costats</strong> es calcula amb la fórmula:</p>
        <p style="text-align:center; font-size:1.3rem; font-weight:bold; margin:10px 0;">Suma dels angles interiors = (n - 2) × 180°</p>
        <p>Aquesta fórmula funciona perquè qualsevol polígon es pot dividir en triangles, cadascun amb una suma de 180°.</p>
        <p><strong>Instruccions:</strong> Utilitza el control lliscant per canviar el nombre de costats. Observa com el polígon es divideix en triangles des d’un vèrtex.</p>
      </div>
      <div style="text-align:center; margin:20px 0;">
        <label for="anglePolygonSlider" style="font-size:1.1rem;">Nombre de costats:
          <span id="anglePolyDisplay" style="font-weight:bold; font-size:1.2rem;">3</span>
        </label><br/>
        <input type="range" id="anglePolygonSlider" min="3" max="12" value="3" style="width:60%; margin-top:10px;"/>
      </div>
      <div id="p5-container" style="border:2px solid #3b82f6; border-radius:8px; margin-top:10px;"></div>
      <p id="sumDisplay" style="font-size:1.2rem; font-weight:bold; text-align:center; margin-top:15px;"></p>
      <button class="next-btn" onclick="nextGeometryPage()">Següent</button>
  
      <style>
        .explanation p {
          font-size: 16px;
          line-height: 1.6;
        }
        #sumDisplay {
          background-color: #f1f5f9;
          padding: 10px;
          border-radius: 6px;
          max-width: 400px;
          margin: 15px auto;
        }
      </style>
    `,
    action: () => {
      if (currentP5Sketch) currentP5Sketch.remove();

      const polySlider = document.getElementById("anglePolygonSlider");
      const polyDisplay = document.getElementById("anglePolyDisplay");
      const sumDisplay = document.getElementById("sumDisplay");

      let sumSketch = function (p) {
        p.setup = function () {
          let c = p.createCanvas(600, 450);
          c.parent("p5-container");
        };

        p.draw = function () {
          p.background(245);
          const sides = parseInt(polySlider.value);
          polyDisplay.textContent = sides;

          const sumOfAngles = (sides - 2) * 180;
          sumDisplay.innerHTML = `Suma dels angles interiors = <strong>${sumOfAngles}°</strong>`;

          const centerX = p.width / 2;
          const centerY = p.height / 2;
          const radius = 140;
          const coords = [];

          for (let i = 0; i < sides; i++) {
            const angle = p.TWO_PI * i / sides - p.HALF_PI;
            const x = centerX + radius * p.cos(angle);
            const y = centerY + radius * p.sin(angle);
            coords.push({ x, y });
          }

          p.fill(248, 113, 113, 60);
          p.stroke(248, 113, 113);
          p.strokeWeight(2);
          p.beginShape();
          coords.forEach((pt) => p.vertex(pt.x, pt.y));
          p.endShape(p.CLOSE);

          p.strokeWeight(1.5);
          p.stroke(59, 130, 246);
          p.drawingContext.setLineDash([5, 5]);
          for (let i = 2; i < sides; i++) {
            p.line(coords[0].x, coords[0].y, coords[i].x, coords[i].y);
          }
          p.drawingContext.setLineDash([]);

          p.fill(59, 130, 246);
          p.ellipse(coords[0].x, coords[0].y, 10, 10);

          p.noStroke();
          p.fill(0);
          p.textSize(14);
          p.textAlign(p.CENTER);
          p.text(`Nombre de triangles formats: ${sides - 2}`, centerX, p.height - 20);
        };

        polySlider.addEventListener("input", () => {
          currentP5Sketch.redraw();
        });
      };

      currentP5Sketch = new p5(sumSketch);
    },
  },

  {
    title: "Comptar Angles en Figures",
    content: `
      <h2 class="section-title">3. Comptar Angles en Figures</h2>
      <div class="explanation" style="max-width:700px; margin:auto; text-align:left;">
        <p>Un <strong>polígon</strong> és una figura tancada formada per segments de línia recta. Cada punt on es troben dos costats s’anomena <strong>vèrtex</strong>, i l’angle format en aquest vèrtex és un <strong>angle interior</strong>.</p>
        <p><strong>Punt clau:</strong> El nombre de costats d’un polígon és igual al nombre de vèrtexs i al nombre d’angles.</p>
        <p><strong>Instruccions:</strong> Mou el control lliscant per seleccionar el nombre de costats. El polígon s’actualitzarà i es mostrarà el nombre total d’angles.</p>
      </div>
      <div style="text-align:center; margin:20px 0;">
        <label style="font-size:1.1rem;">Nombre de costats:
          <span id="anglesSidesVal" style="font-weight:bold; font-size:1.2rem;">3</span>
        </label><br/>
        <input type="range" id="anglesSidesSlider" min="3" max="12" value="3" style="width:60%; margin-top:10px;"/>
      </div>
      <div id="p5-container" style="border:2px solid #3b82f6; border-radius:8px; margin-top:10px;"></div>
      <p id="anglesInfo" style="font-size:1.2rem; font-weight:bold; text-align:center; margin-top:15px;"></p>
      <button class="next-btn" onclick="nextGeometryPage()">Següent</button>
  
      <style>
        .explanation p {
          font-size: 16px;
          line-height: 1.6;
        }
        #anglesInfo {
          background-color: #f1f5f9;
          padding: 10px;
          border-radius: 6px;
          max-width: 400px;
          margin: 15px auto;
        }
      </style>
    `,
    action: () => {
      if (currentP5Sketch) currentP5Sketch.remove();

      const slider = document.getElementById("anglesSidesSlider");
      const valSpan = document.getElementById("anglesSidesVal");
      const info = document.getElementById("anglesInfo");

      let anglesSketch = function (p) {
        p.setup = function () {
          let c = p.createCanvas(600, 450);
          c.parent("p5-container");
        };

        p.draw = function () {
          p.background(245);

          const sides = parseInt(slider.value);
          valSpan.textContent = sides;
          info.innerHTML = `Un polígon de <strong>${sides}</strong> costats té <strong>${sides}</strong> angles.`;

          const centerX = p.width / 2;
          const centerY = p.height / 2;
          const radius = 130;
          const vertices = [];

          // Calcula els vèrtexs
          for (let i = 0; i < sides; i++) {
            const angle = p.TWO_PI * i / sides - p.HALF_PI;
            const x = centerX + radius * p.cos(angle);
            const y = centerY + radius * p.sin(angle);
            vertices.push({ x, y });
          }

          // Dibuixa el polígon
          p.fill(248, 113, 113, 60);
          p.stroke(248, 113, 113);
          p.strokeWeight(2);
          p.beginShape();
          vertices.forEach((v) => p.vertex(v.x, v.y));
          p.endShape(p.CLOSE);

          // Ressalta els vèrtexs i etiqueta els angles
          p.fill(59, 130, 246);
          p.textSize(14);
          vertices.forEach((v, i) => {
            p.ellipse(v.x, v.y, 10, 10);
            p.fill(0);
            p.textAlign(p.CENTER, p.CENTER);
            p.text(`Angle ${i + 1}`, v.x, v.y - 18);
          });
        };

        slider.addEventListener("input", () => {
          currentP5Sketch.redraw();
        });
      };

      currentP5Sketch = new p5(anglesSketch);
    },
  },


  {
    title: "Transformacions 2D",
    content: `
      <h2 class="section-title">1. Transformacions 2D</h2>
      <div class="explanation" style="max-width:700px; margin:auto; text-align:left;">
        <p>Les <strong>transformacions 2D</strong> en geometria inclouen operacions que canvien la posició, la mida o l’orientació d’una figura sense alterar-ne l’estructura.</p>
        <p>En aquesta activitat, pots aplicar:</p>
        <ul>
          <li><strong>Rotació:</strong> Gira la figura al voltant d’un punt fix (el centre).</li>
          <li><strong>Escalat:</strong> Augmenta o redueix la mida de la figura mantenint-ne les proporcions.</li>
        </ul>
        <p><strong>Instruccions:</strong> Utilitza els controls lliscants per girar i escalar el rectangle. Observa com canvia mentre el centre roman fix.</p>
      </div>
      <div style="text-align:center; margin:20px 0;">
        <label for="rotationSlider" style="font-size:1.1rem;">Rotació (0°–360°):
          <span id="rotationVal" style="font-weight:bold; font-size:1.2rem;">0</span>°
        </label><br/>
        <input type="range" id="rotationSlider" min="0" max="360" value="0" style="width:60%; margin-top:10px;"/><br/><br/>
  
        <label for="scaleSlider" style="font-size:1.1rem;">Escalat (0.5x–2.0x):
          <span id="scaleVal" style="font-weight:bold; font-size:1.2rem;">1</span>
        </label><br/>
        <input type="range" id="scaleSlider" min="0.5" max="2" step="0.1" value="1" style="width:60%; margin-top:10px;"/>
      </div>
  
      <div id="p5-container" style="border:2px solid #3b82f6; border-radius:8px; margin-top:10px;"></div>
      <button class="next-btn" onclick="nextGeometryPage()">Següent</button>
  
      <style>
        .explanation ul {
          margin: 10px 0;
          padding-left: 20px;
        }
        .explanation li {
          margin: 6px 0;
          font-size: 16px;
        }
      </style>
    `,
    action: () => {
      if (currentP5Sketch) currentP5Sketch.remove();

      const rotationSlider = document.getElementById("rotationSlider");
      const rotationVal = document.getElementById("rotationVal");
      const scaleSlider = document.getElementById("scaleSlider");
      const scaleVal = document.getElementById("scaleVal");

      let transformSketch = function (p) {
        p.setup = function () {
          let c = p.createCanvas(600, 450);
          c.parent("p5-container");
          p.rectMode(p.CENTER);
        };

        p.draw = function () {
          p.background(245);

          const rotationDeg = parseFloat(rotationSlider.value);
          const scaleFactor = parseFloat(scaleSlider.value);

          rotationVal.textContent = rotationDeg;
          scaleVal.textContent = scaleFactor;

          const centerX = p.width / 2;
          const centerY = p.height / 2;

          // Dibuixa els eixos de referència
          p.stroke(200);
          p.strokeWeight(1);
          p.line(0, centerY, p.width, centerY); // Eix horitzontal
          p.line(centerX, 0, centerX, p.height); // Eix vertical

          // Dibuixa el rectangle original (referència)
          p.noFill();
          p.stroke(180, 180, 180, 150);
          p.rect(centerX, centerY, 200, 100);

          // Aplica les transformacions i dibuixa el rectangle transformat
          p.push();
          p.translate(centerX, centerY);
          p.rotate(p.radians(rotationDeg));
          p.scale(scaleFactor);

          p.fill(59, 130, 246, 80);
          p.stroke(59, 130, 246);
          p.strokeWeight(2);
          p.rect(0, 0, 200, 100); // Rectangle centrat després de les transformacions

          p.pop();
        };
      };

      currentP5Sketch = new p5(transformSketch);
    },
  },


  {
    title: "Reflexions sobre els Eixos",
    content: `
      <h2 class="section-title">2. Reflexions sobre els Eixos</h2>
      <div class="explanation" style="max-width:700px; margin:auto; text-align:left;">
        <p>La <strong>reflexió</strong> en geometria és una transformació que gira una figura sobre una línia (anomenada eix de reflexió), creant una imatge mirall.</p>
        <p>Pots reflectir figures sobre:</p>
        <ul>
          <li><strong>Eix x:</strong> Gira la figura verticalment.</li>
          <li><strong>Eix y:</strong> Gira la figura horitzontalment.</li>
          <li><strong>y = x:</strong> Reflecteix sobre la línia on x i y són iguals.</li>
          <li><strong>y = -x:</strong> Reflecteix sobre la línia on x i y són oposats.</li>
        </ul>
        <p><strong>Instruccions:</strong> Selecciona un eix del menú desplegable per veure com es reflecteix la figura.</p>
      </div>
      <div style="text-align:center; margin:20px 0;">
        <label for="reflectAxisSelect" style="font-size:1.1rem;">Reflexiona sobre:</label>
        <select id="reflectAxisSelect" style="font-size:1rem; padding:5px 10px; border-radius:6px; margin-left:10px;">
          <option value="none">Cap</option>
          <option value="x-axis">Eix x</option>
          <option value="y-axis">Eix y</option>
          <option value="y=x">y = x</option>
          <option value="y=-x">y = -x</option>
        </select>
      </div>
      <div id="p5-container" style="border:2px solid #3b82f6; border-radius:8px; margin-top:10px;"></div>
      <button class="next-btn" onclick="nextGeometryPage()">Següent</button>
  
      <style>
        .explanation ul {
          margin: 10px 0;
          padding-left: 20px;
        }
        .explanation li {
          margin: 6px 0;
          font-size: 16px;
        }
      </style>
    `,
    action: () => {
      if (currentP5Sketch) currentP5Sketch.remove();

      const reflectSelect = document.getElementById("reflectAxisSelect");

      let reflectionSketch = function (p) {
        const shapePoints = [
          { x: 200, y: 250 },
          { x: 250, y: 150 },
          { x: 300, y: 250 },
          { x: 250, y: 300 },
        ];

        p.setup = function () {
          let c = p.createCanvas(600, 450);
          c.parent("p5-container");
        };

        p.draw = function () {
          p.background(245);

          // Dibuixa els eixos de referència
          p.stroke(200);
          p.strokeWeight(1.5);
          p.line(0, p.height / 2, p.width, p.height / 2); // Eix x
          p.line(p.width / 2, 0, p.width / 2, p.height); // Eix y

          // Dibuixa les línies de reflexió
          p.stroke(180, 180, 180, 120);
          p.strokeWeight(1);
          p.drawingContext.setLineDash([5, 5]);
          p.line(0, p.height - p.width, p.width, 0); // y = -x
          p.line(0, 0, p.width, p.height); // y = x
          p.drawingContext.setLineDash([]);

          const mode = reflectSelect.value;

          const reflectedPoints = shapePoints.map(pt => {
            const cx = p.width / 2;
            const cy = p.height / 2;
            const x = pt.x - cx;
            const y = pt.y - cy;

            if (mode === "x-axis") return { x: cx + x, y: cy - y };
            if (mode === "y-axis") return { x: cx - x, y: cy + y };
            if (mode === "y=x") return { x: cx + y, y: cy + x };
            if (mode === "y=-x") return { x: cx - y, y: cy - x };
            return { x: pt.x, y: pt.y }; // Cap reflexió
          });

          // Dibuixa la figura original
          p.stroke(59, 130, 246);
          p.fill(59, 130, 246, 70);
          p.strokeWeight(2);
          p.beginShape();
          shapePoints.forEach(pt => p.vertex(pt.x, pt.y));
          p.endShape(p.CLOSE);

          // Dibuixa la figura reflectida
          if (mode !== "none") {
            p.stroke(248, 113, 113);
            p.fill(248, 113, 113, 70);
            p.beginShape();
            reflectedPoints.forEach(pt => p.vertex(pt.x, pt.y));
            p.endShape(p.CLOSE);
          }
        };
      };

      currentP5Sketch = new p5(reflectionSketch);
    },
  },


  {
    title: "Conceptes Bàsics de Simetria",
    content: `
      <h2 class="section-title">3. Conceptes Bàsics de Simetria</h2>
      <div class="explanation" style="max-width:700px; margin:auto; text-align:left;">
        <p>La <strong>simetria</strong> ocorre quan una figura esdevé exactament igual a una altra quan la gires, la desplaces o la reflecteixes.</p>
        <p>La línia on pots plegar una figura perquè les dues meitats coincideixin perfectament s’anomena <strong>línia de simetria</strong>.</p>
        <p><strong>Instruccions:</strong> Arrossega la línia vertical porpra per veure com la figura es reflecteix sobre ella.</p>
      </div>
      <div id="p5-container" style="border:2px solid #3b82f6; border-radius:8px; margin-top:15px;"></div>
      <button class="next-btn" onclick="nextGeometryPage()">Següent</button>
  
      <style>
        .explanation p {
          font-size: 16px;
          line-height: 1.6;
        }
      </style>
    `,
    action: () => {
      if (currentP5Sketch) currentP5Sketch.remove();

      let symmetrySketch = function (p) {
        let lineX, dragging = false;

        p.setup = function () {
          let c = p.createCanvas(600, 450);
          c.parent("p5-container");
          lineX = p.width / 2; // Inicia la línia de simetria al centre
        };

        p.draw = function () {
          p.background(245);

          // Dibuixa la línia de simetria
          p.stroke(139, 92, 246);
          p.strokeWeight(3);
          p.line(lineX, 0, lineX, p.height);

          const cx = p.width / 2;
          const cy = p.height / 2;

          // Dibuixa la figura original (cercle blau)
          p.fill(59, 130, 246, 70);
          p.noStroke();
          p.ellipse(cx, cy, 150, 150);

          // Calcula la posició reflectida
          const dx = lineX - cx;
          const mirroredX = cx - 2 * dx;

          // Dibuixa la figura reflectida (cercle vermell)
          p.fill(248, 113, 113, 70);
          p.ellipse(mirroredX, cy, 150, 150);

          // Afegeix etiquetes
          p.fill(0);
          p.textSize(14);
          p.textAlign(p.CENTER, p.TOP);
          p.text("Línia de simetria", lineX, 10);
        };

        p.mousePressed = function () {
          if (p.abs(p.mouseX - lineX) < 10) dragging = true;
        };

        p.mouseDragged = function () {
          if (dragging) lineX = p.constrain(p.mouseX, 50, p.width - 50);
        };

        p.mouseReleased = function () {
          dragging = false;
        };
      };

      currentP5Sketch = new p5(symmetrySketch);
    },
  },


  {
    title: "Simetria Rotacional i Ordre",
    content: `
      <h2 class="section-title">4. Simetria Rotacional i Ordre</h2>
      <div class="explanation" style="max-width:700px; margin:auto; text-align:left;">
        <p>La <strong>simetria rotacional</strong> ocorre quan una figura sembla la mateixa després de girar-la un cert angle al voltant del seu centre.</p>
        <p>L’<strong>ordre de simetria rotacional</strong> és el nombre de vegades que una figura encaixa amb si mateixa durant una rotació completa de 360°.</p>
        <p>Per exemple:</p>
        <ul>
          <li>Un quadrat té una simetria rotacional d’ordre 4 (cada 90°).</li>
          <li>Un triangle equilàter té una simetria rotacional d’ordre 3 (cada 120°).</li>
        </ul>
        <p><strong>Instruccions:</strong> Utilitza el control lliscant per canviar el nombre de costats i observa com canvia la simetria de la figura.</p>
      </div>
      <div style="text-align:center; margin:20px 0;">
        <label for="symmetrySides" style="font-size:1.1rem;">Nombre de costats:
          <span id="symmetrySidesVal" style="font-weight:bold; font-size:1.2rem;">4</span>
        </label><br/>
        <input type="range" id="symmetrySides" min="3" max="8" value="4" style="width:60%; margin-top:10px;"/>
      </div>
  
      <div id="p5-container" style="border:2px solid #3b82f6; border-radius:8px; margin-top:10px;"></div>
      <button class="next-btn" onclick="nextGeometryPage()">Següent</button>
  
      <style>
        .explanation ul {
          margin: 10px 0;
          padding-left: 20px;
        }
        .explanation li {
          margin: 6px 0;
          font-size: 16px;
        }
      </style>
    `,
    action: () => {
      if (currentP5Sketch) currentP5Sketch.remove();

      const slider = document.getElementById("symmetrySides");
      const valDisplay = document.getElementById("symmetrySidesVal");

      let rotationalSketch = function (p) {
        p.setup = function () {
          let c = p.createCanvas(600, 450);
          c.parent("p5-container");
        };

        p.draw = function () {
          p.background(245);

          const sides = parseInt(slider.value);
          valDisplay.textContent = sides;
          const angleStep = p.TWO_PI / sides;

          p.translate(p.width / 2, p.height / 2);

          // Dibuixa el cercle de referència
          p.stroke(200);
          p.noFill();
          p.ellipse(0, 0, 220, 220);

          // Línies de simetria rotacional
          p.stroke(180, 180, 180, 120);
          p.strokeWeight(1);
          for (let i = 0; i < sides; i++) {
            const x = 110 * p.cos(angleStep * i);
            const y = 110 * p.sin(angleStep * i);
            p.line(0, 0, x, y);
          }

          // Dibuixa el polígon
          p.stroke(59, 130, 246);
          p.fill(59, 130, 246, 80);
          p.strokeWeight(2);

          p.beginShape();
          for (let i = 0; i < sides; i++) {
            const x = 100 * p.cos(angleStep * i);
            const y = 100 * p.sin(angleStep * i);
            p.vertex(x, y);
          }
          p.endShape(p.CLOSE);

          // Mostra l’ordre de simetria rotacional
          p.fill(0);
          p.textSize(16);
          p.textAlign(p.CENTER);
          p.text(`Ordre de simetria rotacional: ${sides}`, 0, 180);
        };

        slider.addEventListener("input", () => {
          currentP5Sketch.redraw();
        });
      };

      currentP5Sketch = new p5(rotationalSketch);
    },
  },

  {
    title: "Angles en Línies Paral·leles",
    content: `
      <h2 class="section-title">1. Angles en Línies Paral·leles</h2>
      <div class="explanation" style="max-width:700px; margin:auto; text-align:left;">
        <p>Quan dues línies paral·leles són tallades per una transversal, es formen diversos angles:</p>
        <ul>
          <li><strong>Angles corresponents:</strong> Angles iguals al mateix costat de la transversal.</li>
          <li><strong>Angles alterns interns:</strong> Angles iguals en costats oposats de la transversal i entre les línies paral·leles.</li>
          <li><strong>Angles col·laterals interns:</strong> Angles al mateix costat de la transversal que sumen 180°.</li>
        </ul>
        <p><strong>Instruccions:</strong> Utilitza el control lliscant per canviar l’angle de la transversal i observa com varien els angles.</p>
      </div>
      <div style="text-align:center; margin:20px 0;">
        <label for="transSlider" style="font-size:1.1rem;">Angle de la transversal:
          <span id="transVal" style="font-weight:bold; font-size:1.2rem;">30</span>°
        </label><br/>
        <input type="range" id="transSlider" min="0" max="90" value="30" style="width:60%; margin-top:10px;"/>
      </div>
  
      <div id="p5-container" style="border:2px solid #3b82f6; border-radius:8px; margin-top:10px;"></div>
      <button class="next-btn" onclick="nextGeometryPage()">Següent</button>
  
      <style>
        .explanation ul {
          margin: 10px 0;
          padding-left: 20px;
        }
        .explanation li {
          margin: 6px 0;
          font-size: 16px;
        }
      </style>
    `,
    action: () => {
      if (currentP5Sketch) currentP5Sketch.remove();

      const transSlider = document.getElementById("transSlider");
      const transVal = document.getElementById("transVal");

      let parallelSketch = function (p) {
        p.setup = function () {
          let c = p.createCanvas(600, 450);
          c.parent("p5-container");
        };

        p.draw = function () {
          p.background(245);

          const angleDeg = parseInt(transSlider.value);
          transVal.textContent = angleDeg;

          const line1Y = 150;
          const line2Y = 300;

          // Dibuixa les línies paral·leles
          p.stroke(0);
          p.strokeWeight(2);
          p.line(0, line1Y, p.width, line1Y); // Línia superior
          p.line(0, line2Y, p.width, line2Y); // Línia inferior

          // Dibuixa la transversal
          const rad = p.radians(angleDeg);
          const startX = 0, startY = line1Y - 50;
          const endX = p.width, endY = startY + p.width * p.tan(rad);

          p.stroke(255, 0, 0);
          p.strokeWeight(2);
          p.line(startX, startY, endX, endY);

          // Funció per trobar les interseccions
          function getIntersection(yLine) {
            const t = (yLine - startY) / (endY - startY);
            const x = startX + t * (endX - startX);
            return { x, y: yLine };
          }

          const int1 = getIntersection(line1Y);
          const int2 = getIntersection(line2Y);

          // Marca les interseccions
          p.noStroke();
          p.fill(255, 0, 0);
          p.ellipse(int1.x, int1.y, 8, 8);
          p.ellipse(int2.x, int2.y, 8, 8);

          // Càlcul dels angles
          const correspondingAngle = angleDeg;
          const alternateInteriorAngle = angleDeg;
          const coInteriorAngle = 180 - angleDeg;

          // Mostra les etiquetes dels angles
          p.fill(0);
          p.textSize(14);
          p.textAlign(p.LEFT, p.BOTTOM);
          p.text(`Correspondent: ${correspondingAngle}°`, int1.x + 10, int1.y - 10);
          p.text(`Altern intern: ${alternateInteriorAngle}°`, int2.x + 10, int2.y - 10);
          p.text(`Col·lateral intern: ${coInteriorAngle}°`, int2.x + 10, int2.y + 20);
        };

        transSlider.addEventListener("input", () => {
          currentP5Sketch.redraw();
        });
      };

      currentP5Sketch = new p5(parallelSketch);
    },
  },





  {
    title: "Similitud de Triangles",
    content: `
      <h2 class="section-title">1. Similitud de Triangles</h2>
      <div class="explanation" style="max-width:700px; margin:auto; text-align:left;">
        <p>Els <strong>triangles similars</strong> tenen la mateixa forma però poden tenir mides diferents. Compleixen:</p>
        <ul>
          <li>Angles corresponents iguals.</li>
          <li>Costats corresponents proporcionals.</li>
        </ul>
        <p>El factor d’escala determina quant s’amplia o es redueix el segon triangle.</p>
        <p><strong>Instruccions:</strong> Utilitza el control lliscant per canviar el factor d’escala. El triangle vermell es redimensionarà mantenint els mateixos angles que el triangle blau.</p>
      </div>
      <div style="text-align:center; margin:20px 0;">
        <label for="scaleSlider" style="font-size:1.1rem;">Factor d’escala:
          <span id="scaleVal" style="font-weight:bold; font-size:1.2rem;">1</span>
        </label><br/>
        <input type="range" id="scaleSlider" min="0.5" max="3" step="0.1" value="1" style="width:60%; margin-top:10px;"/>
      </div>
  
      <div id="p5-container" style="border:2px solid #3b82f6; border-radius:8px; margin-top:10px;"></div>
      <button class="next-btn" onclick="nextGeometryPage()">Següent</button>
  
      <style>
        .explanation ul {
          margin: 10px 0;
          padding-left: 20px;
        }
        .explanation li {
          margin: 6px 0;
          font-size: 16px;
        }
      </style>
    `,
    action: () => {
      if (currentP5Sketch) currentP5Sketch.remove();

      const scaleSlider = document.getElementById("scaleSlider");
      const scaleVal = document.getElementById("scaleVal");

      let simSketch = function (p) {
        p.setup = function () {
          let c = p.createCanvas(600, 450);
          c.parent("p5-container");
        };

        p.draw = function () {
          p.background(245);

          const scaleFactor = parseFloat(scaleSlider.value);
          scaleVal.textContent = scaleFactor;

          const centerX = p.width / 2;
          const centerY = p.height / 2;

          const A1 = { x: centerX - 100, y: centerY + 60 };
          const B1 = { x: centerX - 60, y: centerY - 80 };
          const C1 = { x: centerX + 60, y: centerY + 60 };

          function scalePoint(pt) {
            return {
              x: centerX + scaleFactor * (pt.x - centerX),
              y: centerY + scaleFactor * (pt.y - centerY),
            };
          }

          const A2 = scalePoint(A1);
          const B2 = scalePoint(B1);
          const C2 = scalePoint(C1);

          // Triangle base (blau)
          p.stroke(59, 130, 246);
          p.fill(59, 130, 246, 60);
          p.strokeWeight(2);
          p.beginShape();
          p.vertex(A1.x, A1.y);
          p.vertex(B1.x, B1.y);
          p.vertex(C1.x, C1.y);
          p.endShape(p.CLOSE);

          // Triangle escalat (vermell)
          p.stroke(248, 113, 113);
          p.fill(248, 113, 113, 60);
          p.beginShape();
          p.vertex(A2.x, A2.y);
          p.vertex(B2.x, B2.y);
          p.vertex(C2.x, C2.y);
          p.endShape(p.CLOSE);

          // Etiquetes
          p.fill(0);
          p.textSize(14);
          p.textAlign(p.CENTER);
          p.text("Triangle base", centerX - 100, centerY + 80);
          p.text("Triangle escalat", centerX + 100, centerY - 100);
        };
      };

      currentP5Sketch = new p5(simSketch);
    },
  },



  {
    title: "Demostració del Teorema de Pitàgores",
    content: `
      <h2 class="section-title">2. Demostració del Teorema de Pitàgores</h2>
      <div class="explanation" style="max-width:700px; margin:auto; text-align:left;">
        <p><strong>Teorema de Pitàgores:</strong> En un triangle rectangle:</p>
        <p style="text-align:center; font-size:1.3rem;"><strong>a² + b² = c²</strong></p>
        <ul>
          <li><strong>a</strong> i <strong>b</strong> són els catets.</li>
          <li><strong>c</strong> és la hipotenusa (el costat més llarg).</li>
        </ul>
        <p>Les àrees dels quadrats sobre els costats <strong>a</strong> i <strong>b</strong> junts són iguals a l’àrea del quadrat sobre el costat <strong>c</strong>.</p>
        <p><strong>Instruccions:</strong> Mou els controls lliscants per canviar les longituds dels catets <strong>a</strong> i <strong>b</strong>. Observa com es relacionen les àrees dels quadrats.</p>
      </div>
      <div style="text-align:center; margin:20px 0;">
        <label for="legASlider" style="font-size:1.1rem;">Catet a (1-8):
          <span id="legAVal" style="font-weight:bold; font-size:1.2rem;">3</span>
        </label><br/>
        <input type="range" id="legASlider" min="1" max="8" value="3" style="width:60%; margin-bottom:15px;"/><br/>
  
        <label for="legBSlider" style="font-size:1.1rem;">Catet b (1-8):
          <span id="legBVal" style="font-weight:bold; font-size:1.2rem;">4</span>
        </label><br/>
        <input type="range" id="legBSlider" min="1" max="8" value="4" style="width:60%;"/>
      </div>
  
      <div id="p5-container" style="border:2px solid #3b82f6; border-radius:8px; margin-top:10px;"></div>
      <p id="pythInfo" style="font-size:1.1rem; text-align:center; margin-top:1rem;"></p>
      <button class="next-btn" onclick="nextGeometryPage()">Següent</button>
  
      <style>
        .explanation ul {
          margin: 10px 0;
          padding-left: 20px;
        }
        .explanation li {
          margin: 6px 0;
          font-size: 16px;
        }
      </style>
    `,
    action: () => {
      if (currentP5Sketch) currentP5Sketch.remove();

      const legASlider = document.getElementById("legASlider");
      const legAVal = document.getElementById("legAVal");
      const legBSlider = document.getElementById("legBSlider");
      const legBVal = document.getElementById("legBVal");
      const pythInfo = document.getElementById("pythInfo");

      let pythSketch = function (p) {
        p.setup = function () {
          let c = p.createCanvas(600, 450);
          c.parent("p5-container");
          p.rectMode(p.CORNER);
        };

        p.draw = function () {
          p.background(245);

          const a = parseFloat(legASlider.value);
          const b = parseFloat(legBSlider.value);

          legAVal.textContent = a;
          legBVal.textContent = b;

          const c = Math.sqrt(a * a + b * b);
          const scale = 25;

          const baseX = p.width / 2 - (a * scale) / 2;
          const baseY = p.height / 2 + (b * scale) / 2;

          const A = { x: baseX, y: baseY };
          const B = { x: baseX + a * scale, y: baseY };
          const C = { x: baseX, y: baseY - b * scale };

          // Triangle rectangle
          p.stroke(0);
          p.strokeWeight(2);
          p.fill(220);
          p.beginShape();
          p.vertex(A.x, A.y);
          p.vertex(B.x, B.y);
          p.vertex(C.x, C.y);
          p.endShape(p.CLOSE);

          // Quadrats dels catets
          p.fill(59, 130, 246, 60); // Quadrat sobre a
          p.quad(A.x, A.y, B.x, B.y, B.x, B.y - a * scale, A.x, A.y - a * scale);

          p.fill(248, 113, 113, 60); // Quadrat sobre b
          p.quad(A.x, A.y, A.x, A.y - b * scale, A.x - b * scale, A.y - b * scale, A.x - b * scale, A.y);

          // Quadrat sobre la hipotenusa
          const dx = B.x - C.x;
          const dy = B.y - C.y;
          const length = Math.sqrt(dx * dx + dy * dy);
          const ux = dx / length;
          const uy = dy / length;
          const nx = -uy;
          const ny = ux;

          p.fill(139, 92, 246, 60);
          p.quad(
            B.x, B.y,
            C.x, C.y,
            C.x + nx * c * scale, C.y + ny * c * scale,
            B.x + nx * c * scale, B.y + ny * c * scale
          );

          // Informació
          pythInfo.innerHTML = `
            a = ${a.toFixed(2)}, &nbsp; b = ${b.toFixed(2)}, &nbsp; c = ${c.toFixed(2)}<br/>
            a² + b² = ${(a * a + b * b).toFixed(2)}, &nbsp; c² = ${(c * c).toFixed(2)}
          `;
        };
      };

      currentP5Sketch = new p5(pythSketch);
    },
  },



  {
    title: "Tessel·lacions",
    content: `
      <h2 class="section-title">1. Tessel·lacions</h2>
      <div class="explanation" style="max-width:700px; margin:auto; text-align:left;">
        <p>Les <strong>tessel·lacions</strong> són patrons formats per formes que encaixen perfectament sense deixar buits ni superposicions. Només algunes formes com els triangles, els quadrats i els hexàgons poden tessel·lar el pla.</p>
        <p><strong>Instruccions:</strong> Selecciona una forma a continuació per veure com crea un patró de tessel·lació.</p>
        <ul>
          <li><strong>Quadrats:</strong> Formen un patró en forma de graella.</li>
          <li><strong>Triangles:</strong> Generen patrons triangulars intricats.</li>
          <li><strong>Hexàgons:</strong> Creen patrons semblants a una bresca d’abelles.</li>
        </ul>
      </div>
  
      <div style="text-align:center; margin:20px 0;">
        <label for="tessellationShapeSelect" style="font-size:1.1rem;">Selecciona una forma:</label>
        <select id="tessellationShapeSelect" style="font-size:1rem; padding:5px; margin-left:10px;">
          <option value="hexagon">Hexàgon</option>
          <option value="triangle">Triangle</option>
          <option value="square">Quadrat</option>
        </select>
      </div>
  
      <div id="p5-container" style="border:2px solid #3b82f6; border-radius:8px; margin-top:10px;"></div>
      <button class="next-btn" onclick="nextGeometryPage()">Següent</button>
  
      <style>
        .explanation ul {
          margin: 10px 0;
          padding-left: 20px;
        }
        .explanation li {
          margin: 6px 0;
          font-size: 16px;
        }
      </style>
    `,
    action: () => {
      if (currentP5Sketch) currentP5Sketch.remove();

      const shapeSelect = document.getElementById("tessellationShapeSelect");

      let tessellationSketch = function (p) {
        p.setup = function () {
          let c = p.createCanvas(600, 450);
          c.parent("p5-container");
          p.noLoop();
        };

        p.draw = function () {
          p.background(245);
          const shape = shapeSelect.value;
          const size = 50;

          if (shape === "hexagon") drawHexTessellation(size);
          if (shape === "triangle") drawTriangleTessellation(size);
          if (shape === "square") drawSquareTessellation(size);
        };

        function drawHexTessellation(size) {
          const w = Math.sqrt(3) * size;
          const h = 2 * size;

          for (let x = -w; x < p.width + w; x += w * 0.75) {
            for (let y = -h; y < p.height + h; y += h * 0.5) {
              p.push();
              p.translate(x, y + (((x / w) % 2) * h) / 4);
              drawPolygon(6, size);
              p.pop();
            }
          }
        }

        function drawTriangleTessellation(size) {
          const h = Math.sqrt(3) * size;
          for (let x = -size; x < p.width + size; x += size) {
            for (let y = -h; y < p.height + h; y += h) {
              p.push();
              p.translate(x, y);
              drawPolygon(3, size);
              p.pop();
            }
          }
        }

        function drawSquareTessellation(size) {
          for (let x = 0; x < p.width; x += size) {
            for (let y = 0; y < p.height; y += size) {
              p.push();
              p.translate(x, y);
              p.fill(59, 130, 246, 80);
              p.stroke(59, 130, 246);
              p.rect(0, 0, size, size);
              p.pop();
            }
          }
        }

        function drawPolygon(sides, radius) {
          p.fill(59, 130, 246, 80);
          p.stroke(59, 130, 246);
          p.beginShape();
          for (let i = 0; i < sides; i++) {
            const angle = (p.TWO_PI * i) / sides;
            const x = radius * p.cos(angle);
            const y = radius * p.sin(angle);
            p.vertex(x, y);
          }
          p.endShape(p.CLOSE);
        }

        shapeSelect.addEventListener("change", () => {
          p.redraw();
        });
      };

      currentP5Sketch = new p5(tessellationSketch);
    },
  },


  {
    title: "Quiz de Geometria (Repte Final)",
    content: `
      <h2 class="section-title">2. Quiz de Geometria (Repte Final)</h2>
      <div class="quiz-container" style="text-align:center; max-width:700px; margin:auto; padding:20px; border:2px solid #3b82f6; border-radius:10px; background-color:#f9fafb;">
        <h3 style="font-size:1.3rem; margin-bottom:10px;">📝 Pregunta:</h3>
        <p style="font-size:1.2rem;"><strong>Quina és la suma dels angles interiors d’un hexàgon?</strong></p>
        <p style="font-size:1rem; color:#555;">💡 Pista: Utilitza la fórmula <strong>(n - 2) × 180°</strong>, on <em>n</em> és el nombre de costats.</p>
  
        <input type="number" id="hexAnswer" placeholder="Introdueix la teva resposta" style="font-size:1rem; padding:8px; width:150px; margin-top:10px; border-radius:5px; border:1px solid #ccc;" />°<br/><br/>
  
        <button onclick="checkHexAnswer()" style="font-size:1rem; padding:10px 20px; background-color:#3b82f6; color:white; border:none; border-radius:5px; cursor:pointer;">
          ✅ Comprova la resposta
        </button>
  
        <p id="quizFeedback" style="font-size:1.2rem; margin-top:1rem; font-weight:bold;"></p>
      </div>
  
      <button class="next-btn" onclick="endGeometryPages()">🏁 Finalitza</button>
  
      <style>
        .quiz-container input:focus {
          outline: none;
          border-color: #3b82f6;
        }
        .quiz-container button:hover {
          background-color: #2563eb;
        }
      </style>
    `,
    action: () => {
      window.checkHexAnswer = function () {
        const answerInput = document.getElementById("hexAnswer");
        const feedback = document.getElementById("quizFeedback");
        const userAnswer = parseInt(answerInput.value);
        const correctAnswer = (6 - 2) * 180; // Suma angles interiors d'un hexàgon

        if (isNaN(userAnswer)) {
          feedback.style.color = "#eab308";
          feedback.textContent = "⚠️ Introdueix un número.";
        } else if (userAnswer === correctAnswer) {
          feedback.style.color = "green";
          feedback.textContent = "🎉 Correcte! La suma dels angles interiors d’un hexàgon és de 720°.";
        } else {
          feedback.style.color = "red";
          feedback.textContent = "❌ Incorrecte, torna a intentar-ho!";
        }
      };
    },
  },

];




































// Algebra Lessons Array
const algebraPages = [
  {
    title: "Variables, Constants i Coeficients",
    content: `
      <h2 class="section-title">1. Variables, Constants i Coeficients</h2>
      <div class="explanation">
        <p>Una expressió algebraica consisteix en <strong>variables</strong>, <strong>constants</strong> i <strong>coeficients</strong>:</p>
        <ul style="text-align:left; max-width:650px; margin:10px auto; line-height:1.6; font-size:16px;">
          <li><strong>Variables:</strong> Lletres que representen valors desconeguts (p. ex., x, y).</li>
          <li><strong>Constants:</strong> Nombres aïllats (p. ex., -7).</li>
          <li><strong>Coeficients:</strong> Nombres davant de les variables (p. ex., 3 en 3x).</li>
        </ul>
        <p>A l'expressió: <strong style="font-size:1.3rem;">3x + 5y - 7</strong></p>
        <p><strong>Fes clic als botons per ressaltar:</strong></p>
      </div>
  
      <div style="text-align:center; margin-top:15px;">
        <button onclick="highlight('variables')" class="action-btn">Ressalta Variables</button>
        <button onclick="highlight('coefficients')" class="action-btn">Ressalta Coeficients</button>
        <button onclick="highlight('constants')" class="action-btn">Ressalta Constants</button>
      </div>
  
      <div id="p5-container" style="margin-top:20px; border:2px solid #3b82f6; border-radius:10px; padding:10px; background-color:#f9fafb;"></div>
      <button class="next-btn" onclick="nextAlgebraPage()">Següent</button>
  
      <style>
        .action-btn {
          background-color: #3b82f6;
          color: white;
          border: none;
          padding: 10px 15px;
          font-size: 16px;
          border-radius: 8px;
          cursor: pointer;
          margin: 5px;
          transition: background-color 0.2s ease, transform 0.1s ease;
        }
        .action-btn:hover {
          background-color: #2563eb;
          transform: scale(1.05);
        }
        .action-btn:active {
          background-color: #1d4ed8;
        }
      </style>
    `,
    action: () => {
      let currentSketch;

      window.highlight = function (component) {
        if (currentSketch) currentSketch.remove();

        const expr = "3x + 5y - 7";
        const parts = expr.match(/[+-]?\s*\d*[a-zA-Z]+|[+-]?\s*\d+/g); // ["3x", "+ 5y", "- 7"]

        currentSketch = new p5((p) => {
          p.setup = function () {
            const canvas = p.createCanvas(600, 120);
            canvas.parent("p5-container");
            p.textSize(30);
            p.textAlign(p.LEFT, p.CENTER);
          };

          p.draw = function () {
            p.background(245);
            let xPos = 30;

            parts.forEach((part) => {
              const trimmed = part.trim();
              const match = trimmed.match(/^([+-]?\s*\d*)([a-zA-Z]*)$/);
              const coefficient = match[1].replace(/\s+/g, "");
              const variable = match[2];

              let coefficientColor = "#000"; // Negre per defecte
              let variableColor = "#000";    // Negre per defecte

              if (component === "variables" && variable) variableColor = "#f87171"; // Vermell
              if (component === "coefficients" && coefficient && variable) coefficientColor = "#60a5fa"; // Blau
              if (component === "constants" && coefficient && !variable) coefficientColor = "#facc15"; // Groc

              if (coefficient) {
                p.fill(coefficientColor);
                p.text(coefficient, xPos, 60);
                xPos += p.textWidth(coefficient);
              }

              if (variable) {
                p.fill(variableColor);
                p.text(variable, xPos, 60);
                xPos += p.textWidth(variable);
              }

              xPos += 25; // Espai entre termes
            });
          };
        });
      };
    },
  },

  {
    title: "Combinació de Termes Semblants",
    content: `
      <h2 class="section-title">2. Combinació de Termes Semblants</h2>
      <div class="explanation">
        <p><strong>Els termes semblants</strong> tenen les mateixes variables elevades als mateixos exponents.</p>
        <p><strong>Objectiu:</strong> Combina els termes semblants sumant o restant els seus coeficients.</p>
        <p>Expressió d'exemple:</p>
        <p style="font-size:1.3rem; font-weight:bold;">4x + 2x - 3 + 5</p>
        <ul style="text-align:left; max-width:650px; margin:10px auto; font-size:16px; line-height:1.6;">
          <li><strong>Pas 1:</strong> Identifica els termes semblants → <span style="color:#60a5fa;">4x + 2x</span> i <span style="color:#facc15;">-3 + 5</span></li>
          <li><strong>Pas 2:</strong> Combina els termes amb x: 4x + 2x = <span style="color:#22c55e; font-weight:bold;">6x</span></li>
          <li><strong>Pas 3:</strong> Combina les constants: -3 + 5 = <span style="color:#22c55e; font-weight:bold;">2</span></li>
        </ul>
        <p><strong>Expressió simplificada final:</strong> <span style="font-size:1.4rem; color:#22c55e; font-weight:bold;">6x + 2</span></p>
      </div>
  
      <div id="p5-container" style="margin-top:20px; border:2px solid #3b82f6; border-radius:10px; padding:10px; background-color:#f9fafb;"></div>
      <button class="next-btn" onclick="nextAlgebraPage()">Següent</button>
  
      <style>
        .explanation ul {
          list-style-type: disc;
          padding-left: 20px;
        }
      </style>
    `,
    action: () => {
      new p5((p) => {
        p.setup = function () {
          const canvas = p.createCanvas(600, 220);
          canvas.parent("p5-container");
          p.textSize(24);
          p.textAlign(p.LEFT, p.CENTER);
        };

        p.draw = function () {
          p.background(245);

          const steps = [
            { text: "4x + 2x - 3 + 5", color: "#3b82f6" },
            { text: "→ (4x + 2x) + (-3 + 5)", color: "#facc15" },
            { text: "→ 6x + 2", color: "#22c55e" },
          ];

          let yStart = 50;      // Posició inicial
          let yGap = 50;       // Espai entre passos

          steps.forEach((step, i) => {
            p.fill(step.color);
            p.text(step.text, 30, yStart + i * yGap);

            if (i < steps.length - 1) {
              p.stroke("#94a3b8");
              p.strokeWeight(1.5);
              p.line(250, yStart + i * yGap + 20, 250, yStart + (i + 1) * yGap - 20);
              p.noStroke();
              p.fill("#94a3b8");
              p.triangle(245, yStart + (i + 1) * yGap - 20, 255, yStart + (i + 1) * yGap - 20, 250, yStart + (i + 1) * yGap - 15);
            }
          });
        };
      });
    },
  },




  {
    title: "Ordre d'Operacions (PEMDAS)",
    content: `
    <h2 class="section-title">3. Ordre d'Operacions (PEMDAS)</h2>
    <div class="explanation">
      <p>L'<strong>ordre d'operacions</strong> és essencial per resoldre correctament les expressions matemàtiques. Recorda l'acrònim <strong>PEMDAS</strong>:</p>
      <ul style="text-align:left; max-width:650px; margin:10px auto; font-size:16px; line-height:1.6;">
        <li><strong>P:</strong> Parèntesis primer</li>
        <li><strong>E:</strong> Exponents (potències i arrels)</li>
        <li><strong>MD:</strong> Multiplicació i Divisió (d'esquerra a dreta)</li>
        <li><strong>AS:</strong> Suma i Resta (d'esquerra a dreta)</li>
      </ul>
      <p><strong>Expressió d'exemple:</strong> <span style="font-size:1.3rem; font-weight:bold;">2 + 3 × (4 - 1) ÷ 3</span></p>
      <p><strong>Solució pas a pas:</strong></p>
      <ol style="text-align:left; max-width:650px; margin:10px auto; font-size:16px; line-height:1.6;">
        <li>Resol dins els parèntesis: (4 - 1) = 3</li>
        <li>Multiplica: 3 × 3 = 9</li>
        <li>Divideix: 9 ÷ 3 = 3</li>
        <li>Suma: 2 + 3 = 5</li>
      </ol>
      <p><strong>Resposta final:</strong> <span style="font-size:1.4rem; color:#22c55e; font-weight:bold;">5</span></p>
    </div>

    <div id="p5-container" style="margin-top:20px; border:2px solid #3b82f6; border-radius:10px; padding:10px; background-color:#f9fafb;"></div>

    <button class="next-btn" onclick="nextAlgebraPage()">Següent</button>

    <style>
      .explanation ul, .explanation ol {
        list-style-type: disc;
        padding-left: 20px;
      }
      .explanation ol {
        list-style-type: decimal;
      }
      .next-btn {
        background-color: #3b82f6;
        color: white;
        border: none;
        padding: 12px 20px;
        font-size: 16px;
        border-radius: 8px;
        cursor: pointer;
        margin-top: 15px;
        transition: background-color 0.2s ease, transform 0.1s ease;
      }
      .next-btn:hover {
        background-color: #2563eb;
        transform: scale(1.05);
      }
      .next-btn:active {
        background-color: #1d4ed8;
      }
    </style>
  `,
    action: () => {
      new p5((p) => {
        let steps = [
          "2 + 3 × (4 - 1)",
          "→ 2 + 3 × 3 ÷ 3",
          "→ 2 + 9 ÷ 3",
          "→ 2 + 3 = 5"
        ];
        let currentStep = 0;

        p.setup = function () {
          const canvas = p.createCanvas(600, 180);
          canvas.parent("p5-container");
          p.textSize(26);
          p.textAlign(p.CENTER, p.CENTER);
          p.frameRate(1); // Un pas per segon
        };

        p.draw = function () {
          p.background(245);
          p.fill("#3b82f6");
          p.text("Resolent pas a pas:", p.width / 2, 30);

          for (let i = 0; i <= currentStep; i++) {
            p.fill(i === currentStep ? "#22c55e" : "#2563eb");
            p.text(steps[i], p.width / 2, 60 + i * 30);
          }

          if (currentStep < steps.length - 1) {
            currentStep++;
          } else {
            p.noLoop(); // Atura quan acaba
          }
        };
      });
    },
  },



  {
    title: "Equacions Lineals (Una Variable)",
    content: `
    <h2 class="section-title">1. Equacions Lineals (Una Variable)</h2>
    <div class="explanation">
      <p>Una <strong>equació lineal en una variable</strong> té la forma <em>ax + b = c</em>.</p>
      <p><strong>Objectiu:</strong> Trobar el valor de <em>x</em> que fa certa l'equació.</p>
      <p>Exemple: Resol <span style="font-size:1.3rem; font-weight:bold;">3x + 2 = 11</span></p>
      <ul style="text-align:left; max-width:650px; margin:10px auto; font-size:16px; line-height:1.6;">
        <li><strong>Pas 1:</strong> Resta 2 a ambdós costats → 3x + 2 - 2 = 11 - 2</li>
        <li><strong>Pas 2:</strong> 3x = 9</li>
        <li><strong>Pas 3:</strong> Divideix ambdós costats per 3 → x = 3</li>
      </ul>
    </div>

    <div id="p5-container" style="margin-top:20px; border:2px solid #3b82f6; border-radius:10px; padding:10px; background-color:#f9fafb;"></div>
    <button class="next-btn" onclick="nextAlgebraPage()">Següent</button>
  `,
    action: () => {
      new p5((p) => {
        p.setup = function () {
          const canvas = p.createCanvas(600, 220);
          canvas.parent("p5-container");
          p.textSize(24);
          p.textAlign(p.LEFT, p.CENTER);
        };

        p.draw = function () {
          p.background(245);
          const steps = [
            "3x + 2 = 11",
            "→ 3x = 11 - 2",
            "→ 3x = 9",
            "→ x = 9 ÷ 3 = 3",
          ];

          let yStart = 50, yGap = 40;
          steps.forEach((step, i) => {
            p.fill(i === steps.length - 1 ? "#22c55e" : "#3b82f6");
            p.text(step, 30, yStart + i * yGap);
          });
        };
      });
    },
  },


  {
    title: "Equacions Lineals (Una Variable)",
    content: `
    <h2 class="section-title">1. Equacions Lineals (Una Variable)</h2>
    <div class="explanation" style="max-width:750px; margin:auto; font-size:16px; line-height:1.6; text-align:left;">
      <p>Una <strong>equació lineal</strong> en una variable té la forma: <em>ax + b = c</em></p>
      <p><strong>Objectiu:</strong> Trobar el valor de <strong>x</strong> que fa certa l'equació.</p>
      <p><strong>Exemple:</strong> Resol <span style="font-size:1.3rem; font-weight:bold;">3x + 2 = 11</span></p>
      <ol>
        <li><strong>Pas 1:</strong> Mou la constant: 3x + 2 = 11 → 3x = 9</li>
        <li><strong>Pas 2:</strong> Divideix ambdós costats: x = 3</li>
      </ol>
      <p>El gràfic mostra la recta <strong>y = 3x + 2</strong> i la recta horitzontal <strong>y = 11</strong>. La solució és el valor de x on s’intersecten.</p>
    </div>

    <div style="text-align:center; margin-top:20px;">
      <label>a: <input type="number" id="aValue" value="3" style="width:60px; padding:5px; margin:5px;"/></label>
      <label>b: <input type="number" id="bValue" value="2" style="width:60px; padding:5px; margin:5px;"/></label>
      <label>c: <input type="number" id="cValue" value="11" style="width:60px; padding:5px; margin:5px;"/></label>
      <button onclick="updateEquationGraph()" style="background-color:#3b82f6; color:white; padding:8px 15px; border:none; border-radius:6px; cursor:pointer;">Actualitza el Gràfic</button>
    </div>

    <canvas id="equationChart" style="max-width:800px; margin:20px auto; display:block; border:2px solid #3b82f6; border-radius:10px;"></canvas>
    <button class="next-btn" onclick="nextAlgebraPage()">Següent</button>

    <style>
      .explanation ol { padding-left: 20px; }
      .explanation li { margin: 6px 0; }
      #aValue, #bValue, #cValue {
        font-size:16px;
        border-radius:5px;
        border:1px solid #ccc;
        text-align:center;
      }
      #aValue:focus, #bValue:focus, #cValue:focus {
        outline: none;
        border-color:#3b82f6;
      }
    </style>
  `,
    action: () => {
      let chartInstance;

      function createChart(a, b, c) {
        const ctx = document.getElementById('equationChart').getContext('2d');
        const xValues = Array.from({ length: 21 }, (_, i) => i - 10);
        const lineY = xValues.map(x => a * x + b);
        const horizontalY = Array(21).fill(c);
        const solution = (c - b) / a;

        if (chartInstance) chartInstance.destroy();

        chartInstance = new Chart(ctx, {
          type: 'line',
          data: {
            labels: xValues,
            datasets: [
              {
                label: `y = ${a}x + ${b}`,
                data: lineY,
                borderColor: "#3b82f6",
                borderWidth: 3,
                tension: 0.1,
                pointRadius: 0,
              },
              {
                label: `y = ${c}`,
                data: horizontalY,
                borderColor: "#f87171",
                borderDash: [6, 4],
                borderWidth: 2,
                pointRadius: 0,
              },
              {
                label: "Punt de solució",
                data: xValues.map(x => x === Math.round(solution) ? c : null),
                backgroundColor: "#22c55e",
                pointRadius: 8,
                showLine: false,
              }
            ]
          },
          options: {
            scales: {
              x: { title: { display: true, text: "x" }, grid: { color: "#e5e7eb" } },
              y: { title: { display: true, text: "y" }, grid: { color: "#e5e7eb" } }
            },
            plugins: { tooltip: { enabled: true }, legend: { position: "top" } },
            responsive: true,
          }
        });
      }

      window.updateEquationGraph = function () {
        const a = parseFloat(document.getElementById('aValue').value);
        const b = parseFloat(document.getElementById('bValue').value);
        const c = parseFloat(document.getElementById('cValue').value);
        createChart(a, b, c);
      };

      updateEquationGraph();  // Inicialitza amb els valors per defecte
    },
  },






  {
    title: "Equacions de Dos Passos i Múltiples Passos",
    content: `
    <h2 class="section-title">2. Equacions de Dos Passos i Múltiples Passos</h2>
    <div class="explanation" style="max-width:750px; margin:auto; font-size:16px; line-height:1.6; text-align:left;">
      <p>Una <strong>equació de dos passos</strong> requereix dues operacions per resoldre <strong>x</strong>.</p>
      <p><strong>Forma general:</strong> <em>ax + b = c</em></p>
      <p><strong>Exemple:</strong> Resol <span style="font-size:1.3rem; font-weight:bold;">2x - 3 = 5</span></p>
      <ol>
        <li><strong>Pas 1:</strong> Suma 3 a ambdós costats → 2x = 8</li>
        <li><strong>Pas 2:</strong> Divideix ambdós costats per 2 → x = 4</li>
      </ol>
      <p>El gràfic mostra:</p>
      <ul>
        <li><span style="color:#10b981; font-weight:bold;">y = ax + b</span>: Línia de l’equació lineal.</li>
        <li><span style="color:#f87171; font-weight:bold;">y = c</span>: Recta horitzontal on s’intersecten.</li>
        <li><span style="color:#22c55e; font-weight:bold;">Punt verd</span>: Punt de solució.</li>
      </ul>
    </div>

    <div style="text-align:center; margin:20px 0;">
      <label>a: <input type="number" id="aVal" value="2" style="width:60px; padding:5px; margin:5px;" /></label>
      <label>b: <input type="number" id="bVal" value="-3" style="width:60px; padding:5px; margin:5px;" /></label>
      <label>c: <input type="number" id="cVal" value="5" style="width:60px; padding:5px; margin:5px;" /></label>
      <button onclick="updateMultiStepChart()" style="background-color:#3b82f6; color:white; padding:8px 15px; border:none; border-radius:6px; cursor:pointer;">Actualitza el Gràfic</button>
    </div>

    <canvas id="multiStepChart" style="max-width:800px; margin:20px auto; display:block; border:2px solid #3b82f6; border-radius:10px;"></canvas>
    <button class="next-btn" onclick="nextAlgebraPage()">Següent</button>

    <style>
      .explanation ol, .explanation ul { padding-left: 20px; }
      #aVal, #bVal, #cVal {
        font-size:16px;
        border-radius:5px;
        border:1px solid #ccc;
        text-align:center;
      }
      #aVal:focus, #bVal:focus, #cVal:focus {
        outline: none;
        border-color:#3b82f6;
      }
    </style>
  `,
    action: () => {
      let chartInstance;

      function createMultiStepChart(a, b, c) {
        const ctx = document.getElementById('multiStepChart').getContext('2d');
        const xValues = Array.from({ length: 21 }, (_, i) => i - 10);
        const lineY = xValues.map(x => a * x + b);
        const horizontalY = Array(21).fill(c);
        const solution = (c - b) / a;

        if (chartInstance) chartInstance.destroy();

        chartInstance = new Chart(ctx, {
          type: 'line',
          data: {
            labels: xValues,
            datasets: [
              {
                label: `y = ${a}x + (${b})`,
                data: lineY,
                borderColor: "#10b981",
                borderWidth: 3,
                tension: 0.2,
                pointRadius: 0,
              },
              {
                label: `y = ${c}`,
                data: horizontalY,
                borderColor: "#f87171",
                borderDash: [5, 5],
                borderWidth: 2,
              },
              {
                label: "Punt de solució",
                data: xValues.map(x => (Math.abs(x - solution) < 0.01 ? c : null)),
                backgroundColor: "#22c55e",
                pointRadius: 7,
                showLine: false,
              }
            ],
          },
          options: {
            scales: {
              x: { title: { display: true, text: "x" }, grid: { color: "#e5e7eb" } },
              y: { title: { display: true, text: "y" }, grid: { color: "#e5e7eb" } }
            },
            plugins: { tooltip: { enabled: true }, legend: { position: "top" } },
            responsive: true,
          }
        });
      }

      window.updateMultiStepChart = function () {
        const a = parseFloat(document.getElementById('aVal').value);
        const b = parseFloat(document.getElementById('bVal').value);
        const c = parseFloat(document.getElementById('cVal').value);
        createMultiStepChart(a, b, c);
      };

      updateMultiStepChart(); // Inicialitza amb valors predeterminats
    },
  },













  {
    title: "Inequacions i els Seus Gràfics",
    content: `
    <h2 class="section-title">3. Inequacions i els Seus Gràfics</h2>
    <div class="explanation" style="max-width:750px; margin:auto; font-size:16px; line-height:1.6; text-align:left;">
      <p>Una <strong>inequació</strong> mostra una relació entre valors que no són iguals.</p>
      <p><strong>Exemple:</strong> Resol i representa <span style="font-weight:bold; font-size:1.2rem;">x ≥ 2</span></p>
      <ol>
        <li>La solució inclou tots els nombres més grans o iguals que 2.</li>
        <li>El gràfic mostra un cercle ple a 2 i una zona ombrejada cap a la dreta.</li>
      </ol>
    </div>

    <div style="text-align:center; margin:20px 0;">
      <label for="inequalitySelect" style="font-size:1rem;">Selecciona la inequació:</label>
      <select id="inequalitySelect" style="font-size:1rem; padding:5px; border-radius:6px;">
        <option value="x>=2">x ≥ 2</option>
        <option value="x>2">x > 2</option>
        <option value="x<=-1">x ≤ -1</option>
        <option value="x<-1">x < -1</option>
      </select>
      <button onclick="updateInequalityChart()" style="background-color:#3b82f6; color:white; padding:8px 15px; border:none; border-radius:6px; margin-left:10px; cursor:pointer;">Actualitza el Gràfic</button>
    </div>

    <canvas id="inequalityChart" style="max-width:800px; margin:auto; border:2px solid #3b82f6; border-radius:10px;"></canvas>
    <button class="next-btn" onclick="nextAlgebraPage()">Següent</button>
  `,
    action: () => {
      let inequalityChart;

      function createInequalityChart(operator, boundary) {
        const ctx = document.getElementById('inequalityChart').getContext('2d');
        const xValues = Array.from({ length: 21 }, (_, i) => i - 10);
        const dataY = xValues.map(x => {
          if (operator === ">=" && x >= boundary) return 1;
          if (operator === ">" && x > boundary) return 1;
          if (operator === "<=" && x <= boundary) return 1;
          if (operator === "<" && x < boundary) return 1;
          return null;
        });

        if (inequalityChart) inequalityChart.destroy();

        inequalityChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: xValues,
            datasets: [
              {
                label: "Zona de solució",
                data: dataY,
                borderColor: "#60a5fa",
                backgroundColor: "rgba(96,165,250,0.3)",
                fill: true,
                pointRadius: 0,
                borderWidth: 2,
              },
              {
                label: `Límit (x = ${boundary})`,
                data: xValues.map(() => 1),
                borderColor: "#f87171",
                borderDash: [5, 5],
                borderWidth: 2,
                pointRadius: 0,
              }
            ]
          },
          options: {
            scales: {
              x: { title: { display: true, text: "x" }, grid: { color: "#e5e7eb" } },
              y: { display: false },
            },
            plugins: { legend: { position: "top" }, tooltip: { enabled: true } },
          }
        });
      }

      window.updateInequalityChart = function () {
        const inequality = document.getElementById('inequalitySelect').value;
        const operator = inequality.match(/[<>]=?/)[0];
        const boundary = parseInt(inequality.match(/-?\d+/)[0]);
        createInequalityChart(operator, boundary);
      };

      updateInequalityChart();  // Carrega el gràfic per defecte
    },
  },


  {
    title: "Equacions i Inequacions amb Valor Absolut",
    content: `
    <h2 class="section-title">4. Equacions i Inequacions amb Valor Absolut</h2>
    <div class="explanation" style="max-width:750px; margin:auto; font-size:16px; line-height:1.6; text-align:left;">
      <p>El <strong>valor absolut</strong> d’un nombre és la seva distància del zero a la recta numèrica.</p>
      <p><strong>Exemple:</strong> Resol <span style="font-size:1.2rem; font-weight:bold;">|x - 3| = 2</span></p>
      <ol>
        <li>Divideix en dos casos: x - 3 = 2 → x = 5, i x - 3 = -2 → x = 1.</li>
        <li>El gràfic mostra la funció en forma de "V" i els punts de solució on s’intersecta amb y = 2.</li>
      </ol>
    </div>

    <canvas id="absValueChart" style="max-width:800px; margin:auto; border:2px solid #3b82f6; border-radius:10px;"></canvas>
    <button class="next-btn" onclick="endAlgebraPages()">Finalitza</button>
  `,
    action: () => {
      const ctx = document.getElementById('absValueChart').getContext('2d');
      const xValues = Array.from({ length: 21 }, (_, i) => i - 5);
      const absY = xValues.map(x => Math.abs(x - 3));
      const targetY = 2;
      const solutionPoints = xValues.map(x => (Math.abs(x - 3) === targetY ? targetY : null));

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: xValues,
          datasets: [
            {
              label: "y = |x - 3|",
              data: absY,
              borderColor: "#22c55e",
              borderWidth: 3,
              fill: false,
              tension: 0.2,
            },
            {
              label: `y = ${targetY}`,
              data: Array(21).fill(targetY),
              borderColor: "#f87171",
              borderDash: [5, 5],
              borderWidth: 2,
              fill: false,
            },
            {
              label: "Punts de solució",
              data: solutionPoints,
              pointBackgroundColor: "#10b981",
              pointRadius: 6,
              showLine: false,
            },
          ],
        },
        options: {
          scales: {
            x: { title: { display: true, text: "x" }, grid: { color: "#e5e7eb" } },
            y: { title: { display: true, text: "y" }, grid: { color: "#e5e7eb" } },
          },
          plugins: {
            tooltip: { enabled: true },
            legend: { position: "top" },
          },
          responsive: true,
        },
      });
    },
  },


];

// Algebra Navigation Functions
function loadAlgebraPage() {
  const contentDiv = document.getElementById("content");
  const page = algebraPages[currentAlgebraPage];

  if (!page) {
    endAlgebraPages();
    return;
  }

  contentDiv.innerHTML = page.content;

  setTimeout(() => {
    if (page.action) page.action();
  }, 0);
}

function nextAlgebraPage() {
  if (currentAlgebraPage < algebraPages.length - 1) {
    currentAlgebraPage++;
    loadAlgebraPage();
  } else {
    endAlgebraPages();
  }
}

function endAlgebraPages() {
  alert("🎉 You’ve completed the Algebra Foundations section!");
  document.getElementById("content").innerHTML = `
    <h2 class="section-title">Algebra Section Completed!</h2>
    <button class="next-btn" onclick="showSection('geometry')">Go to Geometry Lessons</button>
  `;
}

// Section Navigation
// Show a section (handles both Algebra and Geometry)
function showSection(section) {
  if (currentP5Sketch) currentP5Sketch.remove(); // Remove existing p5 sketch
  const contentDiv = document.getElementById("content");

  if (section === "algebra") {
    currentAlgebraPage = 0;
    loadAlgebraPage(); // Load Algebra lessons
  } else if (section === "geometry") {
    currentGeometryPage = 0;
    loadGeometryPage(); // Load Geometry lessons
  } else {
    contentDiv.innerHTML = `<p style='font-size:1.2rem;'>Section "${section}" coming soon...</p>`;
  }
}

























///////////////////////////////////////////////////////////////////////////////
// NAVIGATION FUNCTIONS
///////////////////////////////////////////////////////////////////////////////

// Show a section (default: Geometry)
// Show a section (handles both Algebra and Geometry)
function showSection(section) {
  if (currentP5Sketch) currentP5Sketch.remove(); // Remove existing p5 sketch
  const contentDiv = document.getElementById("content");

  if (section === "algebra") {
    currentAlgebraPage = 0;
    loadAlgebraPage(); // Load Algebra lessons
  } else if (section === "geometry") {
    currentGeometryPage = 0;
    loadGeometryPage(); // Load Geometry lessons
  } else {
    contentDiv.innerHTML = `<p style='font-size:1.2rem;'>Section "${section}" coming soon...</p>`;
  }
}


// Load the current lesson
function loadGeometryPage() {
  if (currentP5Sketch) currentP5Sketch.remove();

  const contentDiv = document.getElementById("content");
  const pageObj = geometryPages[currentGeometryPage];

  if (!pageObj) {
    endGeometryPages();
    return;
  }

  contentDiv.innerHTML = pageObj.content;

  // Call the action function after DOM update
  setTimeout(() => {
    if (pageObj.action) pageObj.action();
  }, 0); // Ensures DOM elements are ready
}

// Navigate to the next lesson (Fixed Navigation)
function nextGeometryPage() {
  if (currentGeometryPage < geometryPages.length - 1) {
    currentGeometryPage++;
    loadGeometryPage();
  } else {
    endGeometryPages();
  }
}


// Show completion message when all lessons are done
function endGeometryPages() {
  alert("🎉 You’ve completed the Geometry Section! Great job! 🎉");
}

// Load geometry section by default
showSection("geometry");