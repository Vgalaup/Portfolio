// Script pour les compteurs animés: modifié par mes soins , mais provient de :https://bashooka.com/coding/animated-chart-graph-examples/

// constructeur de l'objet compteur
let Dial = function(container) {
    this.container = container;
    this.size = this.container.dataset.size;
    this.strokeWidth = this.size / 8;
    this.radius = (this.size / 2) - (this.strokeWidth / 2);
    this.value = this.container.dataset.value;
    this.direction = this.container.dataset.arrow;
    this.svg;
    this.defs;
    this.slice;
    this.overlay;
    this.text;
    this.arrow;
    this.create();
}
// appell des fonctions pour créer l'objet, et l'ajouter au HTML

Dial.prototype.create = function() {
    this.createSvg();
    this.createDefs();
    this.createSlice();
    this.createOverlay();
    this.createText();
    this.createArrow();
    this.container.appendChild(this.svg);
};


// fonction qui ajoute la svg au html+ set sa taille
Dial.prototype.createSvg = function() {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('width', this.size + 'px');
    svg.setAttribute('height', this.size + 'px');
    this.svg = svg;
};

// Defini le tracé du SVG
Dial.prototype.createDefs = function() {
    let defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    let linearGradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    linearGradient.setAttribute('id', 'gradient');
    let stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop1.setAttribute('stop-color', '#ffffff');
    stop1.setAttribute('offset', '0%');
    linearGradient.appendChild(stop1);
    let stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop2.setAttribute('stop-color', '#adbe3f');
    stop2.setAttribute('offset', '100%');
    linearGradient.appendChild(stop2);
    let linearGradientBackground = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    linearGradientBackground.setAttribute('id', 'gradient-background');
    stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop1.setAttribute('stop-color', 'rgba(0, 0, 0, 0.2)');
    stop1.setAttribute('offset', '0%');
    linearGradientBackground.appendChild(stop1);
    stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop2.setAttribute('stop-color', 'rgba(0, 0, 0, 0.05)');
    stop2.setAttribute('offset', '100%');
    linearGradientBackground.appendChild(stop2);
    defs.appendChild(linearGradient);
    defs.appendChild(linearGradientBackground);
    this.svg.appendChild(defs);
    this.defs = defs;
};

Dial.prototype.createSlice = function() {
    let slice = document.createElementNS("http://www.w3.org/2000/svg", "path");
    slice.setAttribute('fill', 'none');
    slice.setAttribute('stroke', 'url(#gradient)');
    slice.setAttribute('stroke-width', this.strokeWidth);
    slice.setAttribute('transform', 'translate(' + this.strokeWidth / 2 + ',' + this.strokeWidth / 2 + ')');
    slice.setAttribute('class', 'animate-draw');
    this.svg.appendChild(slice);
    this.slice = slice;
};

Dial.prototype.createOverlay = function() {
    let r = this.size - (this.size / 2) - this.strokeWidth / 2;
    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute('cx', this.size / 2);
    circle.setAttribute('cy', this.size / 2);
    circle.setAttribute('r', r);
    circle.setAttribute('fill', 'url(#gradient-background)');
    this.svg.appendChild(circle);
    this.overlay = circle;
};

Dial.prototype.createText = function() {
    let fontSize = this.size / 3.5;
    let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute('x', (this.size / 2) + fontSize / 7.5);
    text.setAttribute('y', (this.size / 2) + fontSize / 4);
    text.setAttribute('font-family', 'Century Gothic, Lato');
    text.setAttribute('font-size', fontSize);
    text.setAttribute('fill', '#ffffff');
    text.setAttribute('text-anchor', 'middle');
    let tspanSize = fontSize / 3;
    text.innerHTML = 0 + '<tspan font-size="' + tspanSize + '" dy="' + -tspanSize * 1.2 + '">%</tspan>';
    this.svg.appendChild(text);
    this.text = text;
};

Dial.prototype.createArrow = function() {
    let arrowSize = this.size / 10;
    let arrowYOffset, m;
    if(this.direction === 'up') {
        arrowYOffset = arrowSize / 2;
        m = -1;
    }
    else if(this.direction === 'down') {
        arrowYOffset = 0;
        m = 1;
    }
    let arrowPosX = ((this.size / 2) - arrowSize / 2);
    let arrowPosY = (this.size - this.size / 3) + arrowYOffset;
    let arrowDOffset =  m * (arrowSize / 1.5);
    let arrow = document.createElementNS("http://www.w3.org/2000/svg", "path");
    arrow.setAttribute('d', 'M 0 0 ' + arrowSize + ' 0 ' + arrowSize / 2 + ' ' + arrowDOffset + ' 0 0 Z');
    arrow.setAttribute('fill', '#ffffff');
    arrow.setAttribute('opacity', '0.4');
    arrow.setAttribute('transform', 'translate(' + arrowPosX + ',' + arrowPosY + ')');
    this.svg.appendChild(arrow);
    this.arrow = arrow;
};

Dial.prototype.animateStart = function() {
    let v = 0;
    let self = this;
    let intervalOne = setInterval(function() {
        let p = +(v / self.value).toFixed(2);
        let a = (p < 0.95) ? 2 - (2 * p) : 0.05;
        v += a;
        // Stop
        if(v >= +self.value) {
            v = self.value;
            clearInterval(intervalOne);
        }
        self.setValue(v);
    }, 10);
};

Dial.prototype.animateReset = function() {
    this.setValue(0);
};

Dial.prototype.polarToCartesian = function(centerX, centerY, radius, angleInDegrees) {
  let angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

Dial.prototype.describeArc = function(x, y, radius, startAngle, endAngle){
    let start = this.polarToCartesian(x, y, radius, endAngle);
    let end = this.polarToCartesian(x, y, radius, startAngle);
    let largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    let d = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
    return d;       
}

Dial.prototype.setValue = function(value) {	
		let c = (value / 100) * 360;
		if(c === 360)
			c = 359.99;
		let xy = this.size / 2 - this.strokeWidth / 2;
		let d = this.describeArc(xy, xy, xy, 180, 180 + c);
    this.slice.setAttribute('d', d);
    let tspanSize = (this.size / 3.5) / 3;
    this.text.innerHTML = Math.floor(value) + '<tspan font-size="' + tspanSize + '" dy="' + -tspanSize * 1.2 + '">%</tspan>';
};
 usage();
//
// Usage
//
function usage(){
let containers = document.getElementsByClassName("chart");
for (let i=0;i<containers.length;i++){
let dial = new Dial(containers[i]);
dial.animateStart();
}
}

function resetDials() {


    // J'efface mes compteurs pour reset leur animation
    let svg = document.querySelectorAll('svg');
    for (i = 0; i < svg.length; i++) {
        svg[i].remove();
    }
    // Je redessine mes compteurs et relance leur animation
    usage();

}
// Fin du script pour les compteurs animés!