<pre style="color:#ffea31;background-color: black">
鑓塵幗膂蓿f寥寢膃暠瘉甅甃槊槎f碣綮瘋聟碯颱亦尓㍍i:i:i;;:;:: : :
澣幗嶌塹傴嫩榛畝皋i袍耘蚌紕欒儼巓襴踟篁f罵f亦尓㍍i:i:i;;:;:: : :
漲蔭甃縟諛f麭窶膩I嶮薤篝爰曷樔黎㌢´　　｀ⅷ踟亦尓㍍i:i:i;;:;:: : :
蔕漓滿f蕓蟇踴踴Koray裲f睚鳫巓襴骸　　　　　贒憊亦尓㍍i:i:i;;:;:: : :
榊甃齊爰f懈橈燗殪幢緻I翰儂樔黎夢'”　 　 ,ｨ傾篩縒亦尓㍍i:i:i;;:;:: : :
箋聚蜚壊劑薯i暹盥皋袍i耘蚌紕偸′　　　 雫寬I爰曷f亦尓㍍i:i:i;;:;:: : :
銕颱麼寰篝螂徑悗f篝嚠篩i縒縡齢　　 　 　 Ⅷ辨f篝I鋗f亦尓㍍i:i:i;;:; : : .
碯聟f綴麼辨螢f璟輯駲f迯瓲i軌帶′　　　　　`守I厖孩f奎亦尓㍍i:i:i;;:;:: : : .
綮誣撒f曷磔瑩德f幢儂儼巓襴緲′　 　 　 　 　 `守枢i磬廛i亦尓㍍i:i:i;;:;:: : : .
慫寫廠徑悗緞f篝嚠篩I縒縡夢'´　　　 　 　 　 　 　 `守峽f徑悗f亦尓㍍i:i:i;;:;:: : : .
廛僵I數畝篥I熾龍蚌紕襴緲′　　　　　　　　　　　　　‘守畝皋弊i劍亦尓㍍i:i:i;;:;:: : : .
瘧i槲瑩f枢篝磬曷f瓲軌揄′　　　　　　　　　　　　　,gf毯綴徑悗嚠迩忙亦尓㍍i:i:i;;:;::
襴罩硼f艇艀裲睚鳫襴鑿　　　　　　　　　　 　 　 奪寔f厦傀揵猯i爾迩忙亦尓㍍i:i:
椈棘斐犀耋絎絲絨緲′　　　　　　 　 　 　 　 　 　 　 ”'罨悳萪f蒂渹幇f廏迩忙i亦尓㍍
潁樗I瘧德幢i儂巓緲′　　　　　　 　 　 　 　 　 　 r㎡〟 ”'罨椁裂滅楔滄愼愰迩忙亦
翦i磅艘溲I搦儼巓登zzz zzz㎜㎜ｧg　 　 緲 g　 　 甯體i爺ゎ｡,  ”'罨琥焜毳徭i嵬塰慍絲
枢篝磬f曷迯i瓲軌f襴暹 甯幗緲 ,fi'　　 緲',纜｡　　贒i綟碕碚爺ゎ｡ ”'罨皴發傲亂I黹靱
緞愾慊嵬嵯欒儼巓襴髢驫 I緲 緲　　 ＂,纜髢穐　　甯絛跨飩i髢髢爺ゎ｡`'等誄I筴碌I畷
罩硼I蒻筵硺艇艀i裲睚亀 篳'’,緲　　g亀 Ⅶil髢齢　　贒罩硼i艇艀裲睚鳫爺靠飭蛸I裘裔
椈f棘豢跫跪I衙絎絲絨i爺i㎜iⅣ 　 ,緲i Ⅶ髢靈,　　甯傅喩I揵揚惹屡絎痙棏敞裔筴敢
頬i鞏褂f跫詹雋髢i曷迯瓲軌霤 　 ,緲蔭髢 Ⅶ穐 　 讎椈i棘貅f斐犀耋f絎絲觚f覃黹黍
孵襴蔽戮貲艀舅I肅肄肆fⅧ 　 緲$慚I穐,疊穐　 甯萪碾f鋗輜靠f誹臧鋩f褂跫詹i雋
孵鋐篆f瘧蜑筴裔罩罧I孵Ⅷ　 i鷆嫩槞i歉皸鱚　 冑縡諛諺彙溘嵳勠尠錣綴麼辨螢
</pre>

# CallFlow Visualizer
A web component which gives the possibility to visualize the structure of a CallFlow in an interactive network graph. <p style="color:#ffea31;">(c) Koray Poyraz</p>

### For installing all dependencies
```sh
npm install
```

### To serve locally
```sh
npm start
```

### Sneak peak
#### Displaying path of an entity within a telecommunication network
![callFlow](/preview/callflow.PNG "Visualized CallFlow")

#### Highlight IN and OUT edges on mouse hover (red color)
<img src="/preview/hi_edges.png" alt="drawing" width="600" height="600"/>

#### Highlight condition of an edge on mouse hover
<img src="/preview/hi_con.png" alt="drawing" width="600" height="600"/>

## This project consist of several algorithms
- CJ Algorithm (explanation to follow)
- Dropout Algorithm

### Dropout algorithm
#### - Inspiration
To come up with an appropriate algorithm for solving the drop out of node types problem with the ability to restructure the network graph in a dynamic fashion, I was inspired by the dropout function used in neural networks (NN). In NN, this function is usually used to deactivate features randomly (input and hidden neurons) to reduce overfitting in predictive models.

#### - What is the behavior of the algorithm?
The dropout algorithm basically removes nodetypes and reorders a sequence of small subtrees (related nodes and edges) of a network graph.

The dropout algorithm is basically a method inside the project used to drop out nodes to simplify (reorder) the network graph. So, a function f with two inputs f(G, D) where G is the origin state of the CallFlow and D the dropout nodes. G is a set of Nodes, G = { N1Ej, N2Ej , N3Ej, ...., NiEj } where E is a set of edges to their neighbours E = { E1, ..., Ej }. And D is a set of unique NodeType Strings, D = { D1, D2, D3, ..., Dp}. Also, we use the notation V for a subset of "IN" Nodes, V ⊂ G.
First we fetch a subset of dropout nodes ( D ⊂ G ) including their related ( E ) edges also known as "OUT"/"EXITS". Next, we get a subset of "IN" Nodes ( V ⊂ G ) who do have the dropout Node as an edge(s) "EXIT(S)" for the "gluing" process. At this stage we have a dropout Node ( D ) and its related "IN" Nodes ( V ) and "EXITS" edges ( E ). The next step is to "glue" V with E so n drops out from the graph G. Finally, we update the network graph G with a new structure.

The images below shows the flow of the behavior inside a small part of a CallFlow with 30 nodes and 5 dropout nodes. Normally, this process is applied to a network graph with more than 200 nodes and 800 edges.

1. Finding targeted NodeTypes D

<img src="/preview/1.png" alt="drawing" width="500" height="500"/>

2. Dropping out targeted nodes and gluing the edges E with the neighbors N

<img src="/preview/2.png" alt="drawing" width="500" height="500"/>

3. After gluing the edges the network graph basically gets restructured

<img src="/preview/3.png" alt="drawing" width="500" height="500"/>
