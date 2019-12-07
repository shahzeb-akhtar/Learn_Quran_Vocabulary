const colors10 = d3.schemeCategory10,
		colors20 = d3.schemeCategory20,
		colorThresholds = [1, 2, 5, 10, 20, 50, 100, 200, 500],
		sequentialColors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"], // alternatively colorbrewer.YlGnBu[9]
		HELPER_P_SIZE = "14px",
		TOP_CHOICE_TEXT_SIZE = "16px",
		SURAHS_LEGEND_TEXT_SIZE = "14px",
		SURAHS_TABLE_HEADER_TEXT_SIZE = 15,
		SURAHS_TABLE_TEXT_SIZE = 13,
		SUNBURST_LEVEL_0_ARABIC_SIZE = "32px",
		SUNBURST_LEVEL_1_ARABIC_SIZE = "32px",
		SUNBURST_LEVEL_2_ARABIC_SIZE_1 = "28px",
		SUNBURST_LEVEL_2_ARABIC_SIZE_2 = "24px",
		SUNBURST_LEVEL_3_ARABIC_SIZE_1 = "28px",
		SUNBURST_LEVEL_3_ARABIC_SIZE_2 = "18px",
		SURAH_ARABIC_TEXT_SIZE = 36,
		PAUSEMARK_ARABIC_TEXT_SIZE = 36,
		LEVEL_2_PARAMETER_LIMIT = 12,
		LEVEL_3_PARAMETER_LIMIT = 9,
		lightText = colors10[3],
		meccanColor = d3.rgb(colors10[8]).brighter(0.4),		// "#c7ea46",  // 00cc99, ccff99, lime - c7ea46
		medinaColor = d3.rgb(colors10[8]).darker(0.8),			// "#4B5320", // 009933, 669900, army green - 4B5320
		textColor = "#004d00",
		lightColor = "#ffcc99",
		grayColor = "#cccccc", // "colors10[7],
		darkColor = "#990000",
		formatNumber = d3.format(",d");

const topDiv = d3.select("#top_div"),
	mainDiv = d3.select("#main_div"),
	helpDiv = d3.select("#help_div"),
	disclaimerAndFooterDiv = d3.select("#disclaimer_and_footer_div"),
	wordDetailsTable = d3.select("#word_details_table"),
	detailsDiv = d3.select("#details_div"),
	userHelpP = d3.select("#user_help_text")
					.style("font-size",HELPER_P_SIZE),
	moreDetailsDiv = d3.select("#more_details"),
	engMeaningTd = d3.select("#eng_meaning_td"),
	arabicWordTd = d3.select("#arabic_word_td"),
	wordPartsTd = d3.select("#word_parts_td"),
	rootTd = d3.select("#root_td"),
	basicWordTd = d3.select("#basic_word_td"),
	headerRow = d3.select("#header_row"),
	ayahsAndVisualsDiv = d3.select("#ayahs_and_visual"),
	rootTable = d3.select("#root_table"),
	rootStartSel = d3.select("#root_start"),
	rootFamilySel = d3.select("#root_family"),
	rootSel = d3.select("#root"),
	rootLemmaSel = d3.select("#root_lemma"),
	wordSel = d3.select("#word"),
	tooltip = d3.select("#tooltip"),
	divMoreOptions = d3.select("#more_options"),
	divSunburstOptions = d3.select("#sunburst_options"),
	radioRootSunburst = d3.select("#root_sunburst"),
	radioRootHeat = d3.select("#root_heat"),
	radioSliceSizeFrequency = d3.select("#slice_size_frequency"),
	radioSliceSizeUnique = d3.select("#slice_size_unique"),
	ayahsDiv = d3.select("#ayahs_div"),
	wordDiv = d3.select("#word_div"),
	closeAyahButton = d3.select("#close_ayah_button"),
	ayahsInnerDiv = d3.select("#ayahs_inner_div");


let colors7 = colors10.slice(0, 4);
	colors7.push(colors10[6]);
	colors7 = colors7.concat(colors10.slice(8));

const WORD_ARABIC = 0,
		WORD_ENG_MEANING = 1,
		WORD_ENG_ROOT = 2,
		WORD_ARABIC_ROOT = 3,
		WORD_ENG_LEMMA = 4
		WORD_ARABIC_LEMMA = 5,
		WORD_INFO = 6,
		WORD_NUM_PARTS = 7,
		// below are elements order in word info array
		WORD_INFO_PART_OF_SPEECH = 0,
		WORD_INFO_SPECIAL_CASE = 1,
		WORD_INFO_DOER_DONE_TO = 2,
		WORD_INFO_VERB_TYPE = 3,
		WORD_INFO_VERBAL_NOUN = 4;

const WORD_PART_ENG = 0, // In word parts, the english element
		WORD_PART_ARABIC = 1, // In word parts, the arabic element
		WORD_PART_INFO = 2; // In word parts, the array that contains further info

const INFO_PART_OF_SPEECH = 0; // In array about word parts, POS element noun, verb, etc.
		INFO_PART_OF_WORD = 1, // In array about word parts, prefix, stem, suffix
		INFO_PERSON_GENDER_NUMBER = 2, // In array about word parts,
		INFO_FAMILY = 3,	// In array about word parts,
		INFO_VOICE = 4,	// In array about word parts,
		INFO_NOUN_CASE = 5,	// In array about word parts,
		INFO_DEFINITE = 6,	// In array about word parts,
		INFO_VERB_MOOD = 7,	// In array about word parts,
		INFO_SPECIAL_CASE = 8,	// In array about word parts,
		INFO_NOUN_PARTICIPLE = 9, // // In array about word parts, doer/ done to in the sentece
		INFO_VERB_TYPE = 10, // // In array about word parts, perfect, imperfect, command
		INFO_VERBAL_NOUN = 11; // // In array about word parts,, if it is a verbal noun

const SURAH_INFO_AYAH_NUM = 0; // noun, verb, etc.
		SURAH_INFO_REVEL_ORDER = 1, // prefix, stem, suffix
		SURAH_INFO_RUKU_NUM = 2,
		SURAH_INFO_ARABIC_NAME = 3,
		SURAH_INFO_ENG_NAME = 4,
		SURAH_INFO_ENG_MEANING = 5,
		SURAH_INFO_TYPE = 6,
		SURAH_INFO_BOOK_ORDER = 7;
	
const arabicAlphabets = ["ا", "ب", "ت", "ث", "ج", "ح", "خ", "د", "ذ", "ر", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ك", "ل", "م", "ن", "ه", "و", "ي"],
		nonJoiningAlphabets = ["ا", "د", "ذ", "ر", "ز", "و"],
		topChoices = ["Surahs", "Words with root", "Words with no root"],
		wordPartsInfoObj = {"ACC":"Accusative Particle",
			"ADJ":"Adjective",
			"AMD":"Amendment Particle",
			"ANS":"Answer Particle",
			"AVR":"Aversion Particle",
			"CAUS":"Cause",
			"CERT":"Particle of Certainty",
			"CIRC":"Circumstantial",
			"COM":"Comitative",
			"COND":"Conditional Particle",
			"CONJ":"Conjunction",
			"DEM":"Demonstrative Pronoun",
			"DET":"Determiner",
			"EMPH":"Emphasis",
			"EQ":"Equalization Particle",
			"EXH":"Exhortation Particle",
			"EXL":"Explanation Particle",
			"EXP":"Exceptive Particle",
			"FUT":"Future Particle",
			"IMPN":"Imperative Verbal Noun",
			"IMPV":"Imperative",
			"INC":"Inceptive Particle",
			"INL":"Quranic Initials",
			"INT":"Particle of Interpretation",
			"INTG":"Interrogative Noun",
			"LOC":"Location Adverb",
			"N":"Noun",
			"NEG":"Negative Particle",
			"P":"Preposition",
			"PN":"Proper Noun",
			"PREV":"Preventive Particle",
			"PRO":"Prohibition Particle",
			"PRON":"Pronoun",
			"PRP":"Purpose",
			"REL":"Relative Pronoun",
			"REM":"Resumption ",
			"RES":"Restriction Particle",
			"RET":"Retraction Particle",
			"RSLT":"Result",
			"SUB":"Subordinating Conjunction",
			"SUP":"Supplemental Particle",
			"SUR":"Surprise Particle",
			"T":"Time Adverb",
			"V":"Verb",
			"VOC":"Vocative Particle"
		};

let wordPartKeys = d3.keys(wordParts),
	wordKeys = d3.keys(words),
	buttonShowMoreOptions,
	vizDivH,
	vizDivW,
	detailDivH,
	detailDivW,
	surahRootNoRootSvg,
	rootsSvg,
	rootsNoSvg,
	allNodes,
	resizeTimer,
	goodNodes = [],
	treeRadius,
	selectedSurah,
	selectedLemma,
	selectedType = "",
	moreDetailsArabicSize,
	moreDetailsEnglishSize,
	moreDetailsLabelSize,
	descSize,
	descTitleSize,
	moreDetailsInfoSize,
	moreDetailsPosSize,
	surahAyahNumsObj = {},
	focusDepth,
	disableSbMOver = false,
	disableRectMOver = false,
	xSB = d3.scaleLinear().range([0, 2*Math.PI]).clamp(true),
	ySB = d3.scaleSqrt(), //scaleSqrt
	ayahWordNumsObj = {}, // number of words in an ayah
	noRootLemmaWordsObj = {}, // for each lemma with no root - array of words by type
	lemmaWithRootWordsObj = {}, // for each lemma - [[w,w,w ..],[a,a,a ..], [u,u,u, .. ]] - first element is an array of word keys, second element is array of unique ayahs where the words with lemma occur, third elemt is array unique words with that lemma
	//rootWordsObj = {},  // for each word with root  - [[w,w,w ..],[a,a,a ..]]
	rootLemmaObj = {}, // for each root - the lemmas that belong to it
	rootStartRootObj = {}, // for each root start, all roots that are there
	rootTypeRootObj = {}, // type to roots mapping
	rootTypeLemmaObj = {}, // type to lemma mapping
	rootTypeObj = {}, // root to type mapping
	rootLemmaRootObj = {}, // lemma to root mapping
	rootLemmaTypeObj = {}, // lemma to type mapping
	rootAlphabetCount = {},
	rootRootCount = {},
	noRootWordTypeLemmaObj = {}, // for words with no roots - word types to lemma mapping
	noRootLemmaWordTypeObj = {},
	noRootLemmasCount = {},
	noRootTypeCount = {},
	noRootLemmaTypeCount = {},
	selectedTopChoice = "",
	selectedAlphabet,
	rootsHeirar = [{"name":"All Roots","parent":"", "size":0, "start":""}],
	lastTouchClickTime,
	lastTouchClickD,
	viewType; // possibilities - surah_viz, surah_ayahs, root_viz, root_ayahs, no_root_viz, no_root_ayahs

const partition = d3.partition();
const stratify = d3.stratify()
				.id(function(d) { return d.name; })
				.parentId(function(d) { return d.parent; });

const tree = d3.tree()
				.separation(function(a, b){return (a.parent == b.parent? 1 : 2) / a.depth;});

const arcSB = d3.arc()
				.startAngle(function(d){
					return xSB(d.x0);
				})
				.endAngle(function(d){
					
					return xSB(d.x1);
				})
				.innerRadius(function(d){
					return Math.max(0, ySB(d.y0));
				})
				.outerRadius(function(d){
					return Math.max(10, ySB(d.y1));
				});

const middleArcLine = function(d){
						const halfPi = Math.PI/2;
						const angles = [xSB(d.x0) - halfPi, xSB(d.x1) - halfPi];
						const r = Math.max(0, (ySB(d.y0) + ySB(d.y1)) / 2);

						const middleAngle = (angles[1] + angles[0]) / 2;
						const invertDirection = middleAngle > 0 && middleAngle < Math.PI; // On lower quadrants write text ccw
						if (invertDirection) { angles.reverse(); }

						const path = d3.path();
						path.arc(0, 0, r, angles[0], angles[1], invertDirection); //invertDirection
						return path.toString();
					};

const textFits = function(d){
					const CHAR_SPACE = 6;
					const deltaAngle = xSB(d.x1) - xSB(d.x0);
					const r = Math.max(0, (ySB(d.y0) + ySB(d.y1)) / 2);
					const perimeter = r * deltaAngle;
					return perimeter >= 5;
				};
				
let isMobile = mobileAndTabletcheck();
closeAyahButton.on("click",closeAyahsDiv);
radioSliceSizeFrequency.on("click", sliceSizeTypeChanged);
radioSliceSizeUnique.on("click", sliceSizeTypeChanged);
radioRootHeat.on("click", rootVizTypeChanged);
radioRootSunburst.on("click", rootVizTypeChanged);
detailsDiv.on("mouseenter", moreDetailDivMOver).on("mouseleave", moreDetailDivMOut);

divMoreOptions.on("click",function(){
	d3.event.stopPropagation();
});
d3.select("body").on("click",function(){
	hideMoreOptions();
});		
understandWords();
createTopChoices();
resize();
topChoiceClicked(["Surahs",""]);//"Words with root"

function sliceSizeTypeChanged(){
	prepareRootViz();
}

function rootVizTypeChanged(){
	if(radioRootHeat.node().checked){
		divSunburstOptions.style("display", "none");
	}else{
		divSunburstOptions.style("display", null);
	}
	prepareRootViz();
}

function resize(){
	resetWidths();
	moreDetailsArabicSize = detailDivW/6;
	moreDetailsEnglishSize = detailDivW/18;
	moreDetailsLabelSize = detailDivW/20;
	moreDetailsInfoSize = detailDivW/24;
	moreDetailsPosSize = detailDivW/22;
	descSize = detailDivW/15;
	descTitleSize = detailDivW/10;
	buttonShowMoreOptions.style("display","none");
	switch(viewType){
		case "surah_viz":
			prepareSurahsViz();
			break;
		case "surah_ayahs":
			prepareSurahsViz();
			surahClicked(selectedSurah);
			break;
		case "root_viz":
			buttonShowMoreOptions.style("display",null);
			prepareRootViz();
			break;		
		case "root_ayahs":
			prepareRootViz();
			rootLemmaClicked(selectedLemma, false);
			break;
		case "no_root_viz":
			prepareNoRootViz();
			break;		
		case "no_root_ayahs":
			prepareNoRootViz();
			noRootLemmaClicked(selectedLemma, selectedType, false);
			break;
		default:
			prepareSurahsViz();
	}
}

window.onresize = function(){
	if(resizeTimer){
		clearTimeout(resizeTimer);
	}
	resizeTimer = setTimeout(resize, 50);
}

function resetWidths(){
	let h = window.visualViewport.height,
		w = window.visualViewport.width;
		vizDivW = w*0.73;
		detailDivW = w*0.20;
		vizDivH = (h - topDiv.node().clientHeight) * 0.95;
		if(vizDivH < 200){
			vizDivH = 200;
		}
		if(vizDivW < 350){
			vizDivW = 350;
		}
		treeRadius = d3.min([vizDivH, vizDivW])/2 - 5;
		tree.size([2*Math.PI, treeRadius]);
		ySB.range([0, treeRadius]);
		topDiv.style("width", (w - 20));
		ayahsAndVisualsDiv.style("width", vizDivW).style("max-height", vizDivH).style("height", vizDivH).style("overflow", "auto");
		detailsDiv.style("width", detailDivW).style("height", vizDivH);
		moreDetailsDiv.style("max-height", vizDivH).style("overflow", "auto");
}

function understandWords(){
	let uniqueRoots = [], uniqueLemmas = [],  rootLemmatypes = [];
	wordKeys.forEach(function(ww,wi){
		wws = ww.split("-");
		surahAyahNumsObj[wws[0]] = wws[1];
		ayahWordNumsObj[wws[0] + "-" + wws[1]] = wws[2];
		aa = wws[0] + "-" + wws[1];
		let w = words[ww][WORD_ARABIC];
			r = words[ww][WORD_ARABIC_ROOT],
			l = words[ww][WORD_ARABIC_LEMMA],
			t = words[ww][WORD_INFO][WORD_INFO_PART_OF_SPEECH];
		
		if(r!= "" && uniqueRoots.indexOf(r) < 0){
			uniqueRoots.push(r);
		}
		
		if(r!= "" && rootLemmatypes.indexOf(t) < 0){
			rootLemmatypes.push(t);
		}
		
		if(r == ""){
			// no root
			if(!noRootLemmaWordsObj[l]){
				noRootLemmaWordsObj[l] = {"all":[aa]}
				noRootLemmaWordsObj[l][t] = [aa];
			}else{
				if(noRootLemmaWordsObj[l]["all"].indexOf(aa) < 0){
					noRootLemmaWordsObj[l]["all"].push(aa);
				}
				if(noRootLemmaWordsObj[l][t]){
					if(noRootLemmaWordsObj[l][t].indexOf(aa) < 0){
						noRootLemmaWordsObj[l][t].push(aa);
					}
				}else{
					noRootLemmaWordsObj[l][t] = [aa];
				}
			}
			if(!noRootLemmaTypeCount[l + "_" + t]){
				noRootLemmaTypeCount[l + "_" + t] = 1;
			}else{
				noRootLemmaTypeCount[l + "_" + t] ++;
			}
			if(!noRootLemmasCount[l]){
				noRootLemmasCount[l] = 1
			}else{
				noRootLemmasCount[l]++;
			}
			if(!noRootTypeCount[t]){
				noRootTypeCount[t] = 1;
			}else{
				noRootTypeCount[t]++;
			}
			if(!noRootWordTypeLemmaObj[t]){
				noRootWordTypeLemmaObj[t] = [l];
			}else{
				if(noRootWordTypeLemmaObj[t].indexOf(l) < 0){
					noRootWordTypeLemmaObj[t].push(l);
				}
			}
			if(!noRootLemmaWordTypeObj[l]){
				noRootLemmaWordTypeObj[l] = [t];
			}else{
				if(noRootLemmaWordTypeObj[l].indexOf(t) < 0){
					noRootLemmaWordTypeObj[l].push(t);
				}
			}
		}else{
			// root
			if(uniqueLemmas.indexOf(l) < 0){
				uniqueLemmas.push(l);
			}
			if(!lemmaWithRootWordsObj[l]){
				lemmaWithRootWordsObj[l] = [];
				lemmaWithRootWordsObj[l].push([ww],[aa], [w]);
			}else{
				lemmaWithRootWordsObj[l][0].push(ww);
				if(lemmaWithRootWordsObj[l][1].indexOf(aa) < 0){
					lemmaWithRootWordsObj[l][1].push(aa);
				}
				/*
				if(lemmaWithRootWordsObj[l][2].indexOf(w) < 0){
					lemmaWithRootWordsObj[l][2].push(w);
				}*/				
			}
			/*
			if(!rootWordsObj[w]){
				rootWordsObj[w] = [];
				rootWordsObj[w].push([ww],[aa]);
			}else{
				rootWordsObj[w][0].push(ww);
				if(rootWordsObj[w][1].indexOf(aa) < 0){
					rootWordsObj[w][1].push(aa);
				}				
			}*/
			
			rStart = r.substring(0,1);
			if(!rootLemmaObj[r]){
				rootLemmaObj[r] = [l];
			}else{
				if(rootLemmaObj[r].indexOf(l) < 0){
					rootLemmaObj[r].push(l);
				}
			}
			if(!rootTypeRootObj[t]){
				rootTypeRootObj[t] = [r];
			}else{
				if(rootTypeRootObj[t].indexOf(r) < 0){
					rootTypeRootObj[t].push(r);
				}
			}
			if(!rootTypeLemmaObj[t]){
				rootTypeLemmaObj[t] = [l];
			}else{
				if(rootTypeLemmaObj[t].indexOf(l) < 0){
					rootTypeLemmaObj[t].push(l);
				}
			}
			if(!rootTypeObj[r]){
				rootTypeObj[r] = [t];
			}else{
				if(rootTypeObj[r].indexOf(t) < 0){
					rootTypeObj[r].push(t);
				}
			}
			if(!rootLemmaRootObj[l]){
				rootLemmaRootObj[l] = [r];
			}else{
				if(rootLemmaRootObj[l].indexOf(r) < 0){
					rootLemmaRootObj[l].push(r);
				}
			}
			if(!rootLemmaTypeObj[l]){
				rootLemmaTypeObj[l] = [t];
			}else{
				if(rootLemmaTypeObj[l].indexOf(t) < 0){
					rootLemmaTypeObj[l].push(t);
				}
			}
			if(!rootStartRootObj[rStart]){
				rootStartRootObj[rStart] = [r];
			}else{
				if(rootStartRootObj[rStart].indexOf(r) < 0){
					rootStartRootObj[rStart].push(r);
				}
			}
			if(!rootAlphabetCount[rStart]){
				rootAlphabetCount[rStart] = 1;
			}else{
				rootAlphabetCount[rStart]++;
			}
			if(!rootRootCount[r]){
				rootRootCount[r] = 1;
			}else{
				rootRootCount[r]++;
			}

			
		}
	});
	d3.keys(rootStartRootObj).forEach(function(rs){
		rootsHeirar.push({"name":rs, "parent":"All Roots", "size":0, "start":rs});
		rootStartRootObj[rs].forEach(function(rr){
			rootsHeirar.push({"name":rr, "parent":rs, "size":0, "start":rs});
		});
	});
	d3.keys(rootLemmaObj).forEach(function(rr){
		rootLemmaObj[rr].forEach(function(ll){
			rootsHeirar.push({"name":ll, "parent":rr, "start":rr.substring(0,1)});
		});
	});
}

function hideMoreOptions(){
	divMoreOptions.style("left", "-1000px")
					.style("top", "-1000px");
}

function showMoreOptions(){
	let divLeft = divMoreOptions.style("left");
	divLeft = +divLeft.substring(0, divLeft.length - 2);
	if(divLeft > 0){
		hideMoreOptions();
	}else{
		d3.event.stopPropagation();
		let buttonPos = localToGlobal(buttonShowMoreOptions.node());
		divMoreOptions.style("left", (buttonPos.left - 200) + "px")
						.style("top", buttonPos.bottom + "px");
	}
}

function createTopChoices(){
	let topTableRow = topDiv.append("table").attr("width","100%").append("tbody").append("tr");
	topTableRow.append("td").attr("width", "10%");
	let td = topTableRow.append("td").attr("width", "80%").style("text-align","center");
	surahRootNoRootSvg = td.append("svg").attr("width",450).attr("height",50);
	topChoices.forEach(function(tc,ti){
		gg = surahRootNoRootSvg.append("g")
								.attr("transform","translate(" + (150*ti + 5) + ",10)")
								.datum([tc,""])
								.on("click",topChoiceClicked);
		
		appendRect(gg, {"width":142.5, "height":30, "rx":5, "class":"top_choice", "id":("top_rect_" + tc.split(" ").join("_")), "stroke":"black", "strokeWidth":"0px", "fill":grayColor});
		appendText(gg, {"x":71.25, "y":20, "class":"noselect", "anchor":"middle", "size":TOP_CHOICE_TEXT_SIZE, "text":tc});
	});
	td = topTableRow.append("td").attr("width", "10%").style("text-align","right");
	buttonShowMoreOptions = td.append("button")
								.style("padding", "0px")
								.attr("tooltip", "Click for more options")
								.html("&#11206;")
								.on("click",showMoreOptions);
}

function topChoiceClicked(d){
	_rectMOut();
	closeAyahsDiv();
	sbMOut();
	selectedTopChoice = d[0];
	d3.selectAll(".top_choice").style("stroke-width","0px");
	d3.select("#top_rect_" + d[0].split(" ").join("_")).style("stroke-width","2px");
	buttonShowMoreOptions.style("display","none");
	switch(d[0]){
		case "Surahs":
			prepareSurahsViz();
			break;
		case "Words with root":
			buttonShowMoreOptions.style("display",null);
			prepareRootViz();
			break;
		case "Words with no root":
			prepareNoRootViz();
			break;
	}
}

function prepareSurahsViz(){
	viewType = "surah_viz";
	ayahsAndVisualsDiv.selectAll("*").remove();
	surahHeaderSvg = ayahsAndVisualsDiv.append("svg").attr("width", (vizDivW - 25)).attr("height", 65);
	surahSvg = ayahsAndVisualsDiv.append("div").style("max-height", vizDivH - 70).style("overflow-y", "auto").append("svg").attr("width", (vizDivW - 25));
	
	let scaleWidth = d3.scaleLinear().domain([0,286]).range([250,(vizDivW - 75)]);
	appendRect(surahHeaderSvg, {"x":250, "y":5, "height":15, "width":15, "fill":meccanColor});
	appendText(surahHeaderSvg, {"x":267, "y":18, "class":"noselect", "anchor":"start", "size":SURAHS_LEGEND_TEXT_SIZE, "text":"Meccan Surah"});
	appendRect(surahHeaderSvg, {"x":400, "y":5, "height":15, "width":15, "fill":medinaColor});
	appendText(surahHeaderSvg, {"x":417, "y":18, "class":"noselect", "anchor":"start", "size":SURAHS_LEGEND_TEXT_SIZE, "text":"Medinan Surah"});
	
	appendText(surahHeaderSvg, {"x":85, "y":52, "class":"noselect", "anchor":"end", "size":SURAHS_TABLE_HEADER_TEXT_SIZE, "text":"Name"});
	
	let tt = appendText(surahHeaderSvg, {"y":45, "class":"noselect text_header", "anchor":"middle", "size":SURAHS_TABLE_HEADER_TEXT_SIZE, "datum":"book_order", "click":headerClicked, "decoration":"underline"});
	
	tt.append("tspan").attr("x",125).text("Order in");
	tt.append("tspan").attr("x",125).attr("dy","1.1em").text("Qur'an");
	
	
	tt = appendText(surahHeaderSvg, {"y":45, "class":"noselect text_header", "anchor":"middle", "size":SURAHS_TABLE_HEADER_TEXT_SIZE, "datum":"revel_order", "click":headerClicked});
				
	tt.append("tspan").attr("x",200).text("Order of");
	tt.append("tspan").attr("x",200).attr("dy","1.1em").text("Revelation");
	
	appendText(surahHeaderSvg, {"x":250, "y":52, "class":"noselect text_header", "anchor":"start", "size":SURAHS_TABLE_HEADER_TEXT_SIZE, "text":"Number of Ayahs", "datum":"ayah_num", "click":headerClicked});
			
	surahInfo.sort(function(a, b){
		return a[SURAH_INFO_BOOK_ORDER] - b[SURAH_INFO_BOOK_ORDER];
	});
	
	surahInfo.forEach(function(ss, si){
		let gg = surahSvg.append("g").attr("transform","translate(0, " + (18 + (si*20)) + ")").attr("id", "g_" + ss[SURAH_INFO_BOOK_ORDER]);
		appendText(gg, {"x":85, "class":"noselect", "anchor":"end", "size":SURAHS_TABLE_TEXT_SIZE, "text":ss[SURAH_INFO_ENG_NAME]});
		appendText(gg, {"x":125, "class":"noselect", "anchor":"middle", "size":SURAHS_TABLE_TEXT_SIZE, "text":ss[SURAH_INFO_BOOK_ORDER]});
		appendText(gg, {"x":200, "class":"noselect", "anchor":"middle", "size":SURAHS_TABLE_TEXT_SIZE, "text":ss[SURAH_INFO_REVEL_ORDER]});
		if(isMobile){
			appendRect(gg, {"x":250, "y":-10, "height":15, "width":(scaleWidth(ss[SURAH_INFO_AYAH_NUM]) - scaleWidth(0)), "fill":(ss[SURAH_INFO_TYPE] == "Meccan" ? meccanColor : medinaColor), "datum":ss[SURAH_INFO_BOOK_ORDER].toString(), "touchend":surahClickedTouch});
		}else{
			appendRect(gg, {"x":250, "y":-10, "height":15, "width":(scaleWidth(ss[SURAH_INFO_AYAH_NUM]) - scaleWidth(0)), "fill":(ss[SURAH_INFO_TYPE] == "Meccan" ? meccanColor : medinaColor), "datum":ss[SURAH_INFO_BOOK_ORDER].toString(), "click":surahClicked, "mouseover":surahMouseOver, "mouseout":surahMouseOut});
		}
		
		appendText(gg, {"x": (scaleWidth(ss[SURAH_INFO_AYAH_NUM]) + 2), "y":2, "class":"noselect", "anchor":"start", "size":SURAHS_TABLE_TEXT_SIZE, "text":ss[SURAH_INFO_AYAH_NUM]});
	});
	surahSvg.attr("height", (15 + (surahInfo.length*20)));
	/*userHelpP.selectAll("*").remove();
	userHelpP.html("Click on table headers to sort surahs by order in Qur'an or order of revelation or number of ayahs. Hover over a surah bar to see more information. Click on a surah bar to view a surah");*/
}

function headerClicked(d){
	let dOut = d;
	d3.selectAll(".text_header").style("text-decoration", function(d){
		if(dOut == d){
			return "underline";
		}else{
			return null;
		}
	});
	switch(d){
		case "book_order":
			surahInfo.sort(function(a, b){
				return a[SURAH_INFO_BOOK_ORDER] - b[SURAH_INFO_BOOK_ORDER];
			});
			break;
		case "revel_order":
			surahInfo.sort(function(a, b){
				return a[SURAH_INFO_REVEL_ORDER] - b[SURAH_INFO_REVEL_ORDER];
			});
			break;
		case "ayah_num":
			surahInfo.sort(function(a, b){
				return b[SURAH_INFO_AYAH_NUM] - a[SURAH_INFO_AYAH_NUM];
			});						
			break;
	}
	surahInfo.forEach(function(ss, si){
		d3.select("#g_" + ss[SURAH_INFO_BOOK_ORDER]).attr("transform", "translate(0, " + (15 + (si*20)) + ")");
	});
}

function surahMouseOver(s){
	moreDetailsDiv.selectAll("*").remove();
	appendP(moreDetailsDiv, {"size":descTitleSize, "align":"center", "html":surahInfo[s- 1][SURAH_INFO_ENG_NAME]});
	appendP(moreDetailsDiv, {"size":descSize, "html":surahDesc[s- 1]});
}

function surahMouseOut(){
	moreDetailsDiv.selectAll("*").remove();
}

function closeAyahsDiv(){
	switch(viewType){
		case "surah_ayahs":
			viewType = "surah_viz";
			break;
		case "root_ayahs":
			buttonShowMoreOptions.style("display", null);
			viewType = "root_viz";
			break;
		case "no_root_ayahs":
			viewType = "no_root_viz";
			break;
	}
	ayahsInnerDiv.selectAll("*").remove();
	ayahsDiv.style("left","-10000px")
			.style("top","-10000px");
	moreDetailsDiv.selectAll("*").remove();
}

// from : https://stackoverflow.com/questions/1350581/how-to-get-an-elements-top-position-relative-to-the-browsers-viewport/1350681#1350681
function localToGlobal( _el ) {
       var target = _el,
       target_width = target.offsetWidth,
       target_height = target.offsetHeight,
       target_left = target.offsetLeft,
       target_top = target.offsetTop,
       gleft = 0,
       gtop = 0,
       rect = {};

       var moonwalk = function( _parent ) {
        if (!!_parent) {
            gleft += _parent.offsetLeft;
            gtop += _parent.offsetTop;
            moonwalk( _parent.offsetParent );
        } else {
            return rect = {
            top: target.offsetTop + gtop,
            left: target.offsetLeft + gleft,
            bottom: (target.offsetTop + gtop) + target_height,
            right: (target.offsetLeft + gleft) + target_width
            };
        }
    };
        moonwalk( target.offsetParent );
        return rect;
}

function prepareAyahsDiv(){
	ayahsInnerDiv.selectAll("*").remove();
	ayahsInnerDiv.node().scrollTop = 0;
	let ayahsAndVisualsDivPos = localToGlobal(ayahsAndVisualsDiv.node());
	ayahsDiv.style("left",ayahsAndVisualsDivPos.left)
			.style("top",ayahsAndVisualsDivPos.top)
			.style("width",(ayahsAndVisualsDivPos.right - ayahsAndVisualsDivPos.left));
	ayahsInnerDiv.style("height", (ayahsAndVisualsDivPos.bottom - ayahsAndVisualsDivPos.top - 36));
}

function surahClickedTouch(d){
	d3.event.preventDefault();
	d3.event.stopPropagation();
	if(!lastTouchClickD){
		//alert("calling word mouse over");
		surahMouseOver(d);
	}else{
		let currTime = new Date();
		
		if(lastTouchClickD === d && currTime - lastTouchClickTime < 750){
			surahClicked(d);
		}else{
			surahMouseOver(d);
		}
	}
	lastTouchClickD = d;
	lastTouchClickTime = new Date();
}
function surahClicked(s){
	moreDetailsDiv.selectAll("*").remove();
	if(s.indexOf("-")<0){
		selectedSurah = s; // first surah clicked
	}else{
		selectedSurah = s.split("-")[0];
	}
	viewType = "surah_ayahs";
	ayahsInSurah = +surahAyahNumsObj[selectedSurah];
	prepareAyahsDiv();
	for(zzz = 1; zzz <= ayahsInSurah; zzz++){
		ayahNum = selectedSurah + "-" + zzz;
		showAyah({"a":ayahNum, "i":zzz, "l":"no_lemma", "d":ayahsInnerDiv});
	}
	if(s.indexOf("-")>0){
		ayahNumChanged(s);
	}
	/*userHelpP.selectAll("*").remove();
	userHelpP.html("Hover over a word to see details about the word. If there is a stop sign after the word, more information on stop sign is shown as well.");*/
}

function ayahNumChanged(a){ // a is of the form s-a, s is surah, a is ayah number
	scrollStart = document.getElementById("a_"+selectedSurah + "-1").offsetTop;
	scrollEnd = document.getElementById("a_"+a).offsetTop;
	ayahsInnerDiv.node().scrollTop = scrollEnd - scrollStart + 10;
}

function prepareNoRootViz(){
	viewType = "no_root_viz";
	ayahsAndVisualsDiv.selectAll("*").remove();
	rootsNoSvg = ayahsAndVisualsDiv.append("svg").attr("width", vizDivW).attr("height", vizDivH);
	appendText(rootsNoSvg, {"x":(vizDivW/2), "y":20, "fill":"red", "text":"Updating ..."});
	setTimeout(createNoRootViz, 5);	
}

function createColorLegend(svgElem, thinVer){
	let legendHeight = thinVer? 5 : 10, legendWidth = (0.8 * vizDivW)/9;
	colorThresholds.forEach(function(ct, ci){
		appendRect(svgElem, {"x":((0.1 * vizDivW) + (ci * legendWidth)), "y":2, "width":legendWidth, "height":legendHeight, "fill":sequentialColors[ci]});
		appendText(svgElem, {"x":((0.1 * vizDivW) + (ci * legendWidth)), "y":(legendHeight + 5) , "text":"≥ " + formatNumber(ct), "baseline":"hanging", "size":Math.floor(legendWidth/7)});
	});
	
}

function getRectAndTextColor(val){
	let rectFill, textFill = "black";
	colorThresholds.forEach(function(ct, ci, cArr){
		if(rectFill) return;
		if(ci < cArr.length - 1){
			if(val >= ct && val < cArr[ci + 1]){
				rectFill = sequentialColors[ci];
				if(ci > 6){
					textFill = "white";
				}
			}
		}else{
			rectFill = sequentialColors[ci];
			textFill = "white";
		}
	});
	return [rectFill, textFill]
}

function createNoRootViz(){
	rootsNoSvg.selectAll("*").remove();
	let types = d3.keys(noRootWordTypeLemmaObj),
		noRootLemmas = d3.keys(noRootLemmaWordTypeObj),
		areaAvaliable = (vizDivW/2) * (vizDivH - 50),
		typeRectArea = areaAvaliable/types.length,
		lemmaRectArea = areaAvaliable/noRootLemmas.length,
		typeRectWidth = Math.sqrt(typeRectArea) * 1.2,
		typeRectHeight = Math.sqrt(typeRectArea) * 0.6,
		lemmaRectWidth = Math.sqrt(lemmaRectArea) * 1.2,
		lemmaRectHeight = Math.sqrt(lemmaRectArea) * 0.6,
		typeRectInARow = Math.floor((vizDivW/2)/typeRectWidth),
		lemmaRectInARow = Math.floor((vizDivW/2)/lemmaRectWidth);
	if(isMobile){
		rootsNoSvg.on("touchend", _rectMOut);
	}
	types.sort().forEach(function(t, i){
		let tt, tSpan, rectFill, textFill;
		let gg = rootsNoSvg.append("g")
							.attr("transform", "translate(" + ((i % typeRectInARow) * typeRectWidth) + "," + (50 + (Math.floor(i/typeRectInARow) * typeRectHeight)) + ")")
							.attr("class", "no_root_type")
							.datum({"type":"no_root_type", "value":t})
							
		if(isMobile){
			gg.on("touchend", function(d){
				d3.event.preventDefault();
				d3.event.stopPropagation();
				_rectMOver(d);
			});
		}else{
			gg.on("mouseenter", rectMOver)
				.on("mouseleave", rectMOut);
		}				
		[rectFill, textFill] = getRectAndTextColor(noRootTypeCount[t]);			
		appendRect(gg, {"width":0.95 * typeRectWidth, "height":0.95 * typeRectHeight, "rx":0.05 * typeRectWidth, "fill":rectFill});
		let textArr = wordPartsInfoObj[t].split(" ");
		if(textArr.length > 1){
			tt = appendText(gg, {"y":typeRectHeight * 0.5 * 0.95, "fill":textFill, "class":"noselect", "anchor":"middle", "size":Math.floor(typeRectWidth/7)});
			textArr.forEach(function(ts, ti){
				tSpan = tt.append("tspan")
							.attr("x", typeRectWidth * 0.5 * 0.95)
							.text(ts);
				if(ti > 0){
					tSpan.attr("dy", "1em");
				}else{
					if(textArr.length > 2){
						tSpan.attr("dy", "-0.5em");
					}
				}
			});
		}else{
			appendText(gg, {"x":typeRectWidth * 0.5 * 0.95, "y":typeRectHeight * 0.6 * 0.95, "text": textArr[0], "class":"noselect", "fill":textFill, "anchor":"middle", "size":Math.floor(typeRectWidth/7)});
		}
	});
	
	noRootLemmas.sort().forEach(function(l, i){
		let tt, rectFill, textFill;
		[rectFill, textFill] = getRectAndTextColor(noRootLemmasCount[l]);
		let gg = rootsNoSvg.append("g")
							.attr("transform", "translate(" + ( vizDivW - ((i % lemmaRectInARow + 1) * lemmaRectWidth)) + "," + (50 + (Math.floor(i/lemmaRectInARow) * lemmaRectHeight)) + ")")
							.attr("class", "no_root_lemma")
							.datum({"type":"no_root_lemma", "value":l})
							.on("click", rectClicked)
							.on("mouseenter", rectMOver)
							.on("mouseleave", rectMOut);
		appendRect(gg, {"width":0.95 * lemmaRectWidth, "height":0.95 * lemmaRectHeight, "rx":0.05 * lemmaRectWidth, "fill":rectFill });
		appendText(gg, {"x":lemmaRectWidth * 0.5 * 0.95, "y":lemmaRectHeight * 0.7 * 0.95, "text":l, "class":"noselect", "fill":textFill, "anchor":"middle", "size":Math.floor(lemmaRectWidth/3)});
	});
	
	createColorLegend(rootsNoSvg);
}

function prepareRootViz(){
	viewType = "root_viz";
	ayahsAndVisualsDiv.selectAll("*").remove();
	rootsSvg = ayahsAndVisualsDiv.append("svg").attr("width", vizDivW).attr("height", vizDivH);
	appendText(rootsSvg, {"x":(vizDivW/2), "y":20, "fill":"red", "text":"Updating ..."});
	if(radioRootSunburst.node().checked){
		goodNodes = [];
		let sunburstRoot = tree(stratify(rootsHeirar));
		sunburstRoot.descendants().forEach(function(nd, ni, sb){
			if(!nd.children){
				//if can have other filtering here as well
				if(radioSliceSizeFrequency.node().checked){
					sb[ni]["size"] = lemmaWithRootWordsObj[nd.id][0].length;
				}else{
					sb[ni]["size"] = 1;
				}
			}else{
				sb[ni]["size"] = 0;
			}
		});
		let rootSB = d3.hierarchy(sunburstRoot)
						.sum(function(d) { return d.size; })
						.sort(function(a,b){
							if(a.data.data.start.charCodeAt(0) !== b.data.data.start.charCodeAt(0)){
								return a.data.data.start.charCodeAt(0) - b.data.data.start.charCodeAt(0);
							}else{
								if(a.data.data.name < b.data.data.name){
									return -1;
								}
								if(a.data.data.name > b.data.data.name){
									return 1;
								}
								return 0;
							}
						});
		
		allNodes = partition(rootSB).descendants();
		setTimeout(createSB, 5);
	}else{
		// heat map
		setTimeout(createRootsHeatMap, 5);
	}
}

function createRootsHeatMap(){
	rootsSvg.selectAll("*").remove();
	let roots = d3.keys(rootTypeObj),
		areaAvaliable = (vizDivW * 0.98) * (vizDivH * 0.9),
		rootsRectArea = areaAvaliable * 10/roots.length,
		alphabetRectWidth = vizDivW/arabicAlphabets.length,
		alphabetRectHeight = alphabetRectWidth/1.2,
		rootRectWidth = Math.sqrt(rootsRectArea) * 0.8,
		rootRectHeight = Math.sqrt(rootsRectArea) * 0.5,
		alphabetRectInARow = 28,
		rootRectsInARow = Math.floor(vizDivW/rootRectWidth);
	
	selectedAlphabet = arabicAlphabets[0];
	let allAlphabetsG = rootsSvg.append("g")
								.attr("id", "outer_g");
	arabicAlphabets.forEach(function(a, i){
		let tt, tSpan, rectFill, textFill;
		let gg = rootsSvg.append("g")
							.attr("transform", "translate(" + (vizDivW - ((i + 1) * alphabetRectWidth)) + "," + (30 + (0.2 * alphabetRectHeight))+ ")")
							.attr("class", "root_type")
							.datum({"type":"root_type", "value":a, "xCoord":(vizDivW - ((i + 1) * alphabetRectWidth)), "height":alphabetRectHeight})
							.on("click", alphabetRectClicked);
							
		[rectFill, textFill] = getRectAndTextColor(rootAlphabetCount[a]);			
		appendRect(gg, {"width":0.95 * alphabetRectWidth, "height":0.85 * alphabetRectHeight, "rx":0.1 * alphabetRectWidth, "fill":rectFill});
		appendText(gg, {"x":alphabetRectWidth * 0.5 * 0.95, "y":alphabetRectHeight * 0.6 * 0.95, "text": a, "class":"noselect", "fill":textFill, "anchor":"middle", "size":Math.floor(alphabetRectWidth/2)});
		if(i === 0){
			let triangleG = rootsSvg.append("g")
									.attr("transform", "translate(" + (vizDivW - ((i + 1) * alphabetRectWidth)) + "," + (30 + (1.2 * alphabetRectHeight)) + ")")
									.attr("id", "triangle_g");
			triangleG.append("path")
						.attr("d", "M " + (alphabetRectWidth/2) + ",0" + 
									"L " + ((alphabetRectWidth/2) + (alphabetRectWidth * 0.2 * 0.5)) + "," + (Math.sqrt(3) * 0.5 * alphabetRectWidth * 0.2) + 
									"L " + ((alphabetRectWidth/2) - (alphabetRectWidth * 0.2 * 0.5)) + "," + (Math.sqrt(3) * 0.5 * alphabetRectWidth * 0.2) + 
									"Z"
						);
		}
									
		let alphabetWordsG = allAlphabetsG.append("g")
											.attr("transform", "translate(" + (- vizDivW * i) + "," + (30 + (2 * alphabetRectHeight)) + ")")
											.attr("id", "big_g_" + a);
										
		let colIterator = 0, rowIterator = 0, nextCol;
		rootStartRootObj[a].sort().forEach(function(r, i){
			nextCol = colIterator + 1 + Math.ceil(rootLemmaObj[r].length/2);
			if(nextCol > rootRectsInARow){
				colIterator = 0;
				rowIterator++;
				nextCol = colIterator + 1 + Math.ceil(rootLemmaObj[r].length/2);
			}
			let tt, rectFill, textFill;
			[rectFill, textFill] = getRectAndTextColor(rootRootCount[r]);
			let gg = alphabetWordsG.append("g")
								.attr("transform", "translate(" + ( vizDivW - ((colIterator + 1) * rootRectWidth)) + "," + (rowIterator * rootRectHeight) + ")")
								.attr("class", "root_root root_root_" + a)
								.datum({"type":"root_root", "value":r, "root_value":r, "alphabet":a})
								.on("mouseenter", rootRectMOver)
								.on("mouseleave", rootRectMOut);
			appendRect(gg, {"width":0.9 * rootRectWidth, "height":0.8 * rootRectHeight, "rx":0.05 * rootRectWidth, "fill":rectFill });
			appendText(gg, {"x":rootRectWidth * 0.5 * 0.9, "y":rootRectHeight * 0.7 * 0.8, "text":r, "class":"noselect", "fill":textFill, "anchor":"middle", "size":Math.floor(rootRectWidth/3), "weight":"bold", "stretch":"ultra-condensed"});
			
			rootLemmaObj[r].forEach(function(rl,ri){
				[rectFill, textFill] = getRectAndTextColor(lemmaWithRootWordsObj[rl][0].length);
				gg = alphabetWordsG.append("g")
								.attr("transform", "translate(" + ( vizDivW - ((colIterator + 2 + Math.floor(ri/2)) * rootRectWidth)) + "," + ((rowIterator + ((ri % 2) * 0.5)) * rootRectHeight) + ")")
								.attr("class", "root_root root_root_" + a)
								.datum({"type":"root_word", "value":rl, "root_value":r, "alphabet":a})
								.on("mouseenter", rootRectMOver)
								.on("mouseleave", rootRectMOut)
								.on("click", rectClicked);
			appendRect(gg, {"width":0.9 * rootRectWidth, "height":0.4 * rootRectHeight, "rx":0.025 * rootRectWidth, "fill":rectFill });
			appendText(gg, {"x":rootRectWidth * 0.8, "y": rootRectHeight * 0.35 * 0.8, "text":rl, "class":"noselect", "fill":textFill, "anchor":"end", "size":Math.floor(rootRectWidth/5)});
			});
			colIterator = nextCol;
		});	
	});
	createColorLegend(rootsSvg);
}

function alphabetRectClicked(d){
	let previousIndex = arabicAlphabets.indexOf(selectedAlphabet),
		index = arabicAlphabets.indexOf(d.value);
	if(previousIndex === index){
		// nothing to do
	}else{
		d3.select("#triangle_g")
			.transition()
			.duration(500)
			.attr("transform", "translate(" + (d.xCoord) + "," + (30 + (1.2 * d.height)) + ")");
			
		d3.select("#outer_g")
			.transition()
			.duration(750)
			.attr("transform", "translate(" + (vizDivW * index) + ",0)");	
		selectedAlphabet = d.value;
	}
	
}

function createSB(d){
	if(d){
		focusDepth = d.depth;
		xSB.domain([d.x0, d.x1]);
		ySB.domain([d.y0, 1]);
		if(d.depth > 0){
			ySB.range([25, treeRadius]);
		}else{
			ySB.range([0, treeRadius]);
		}
		
	}else{
		focusDepth = 0;
		xSB.domain([0,1]);
		ySB.domain([0,1]);
		ySB.range([0, treeRadius]);
	}
	rootsSvg.selectAll("*").remove();
	let sbG = rootsSvg.append("g").attr("transform","translate(" + (vizDivW/2) + "," + (vizDivH/2) + ")");
	allNodes.forEach(function(nd, ni){
		if(goodNodes.length > 0 && goodNodes.indexOf(nd.data.data.name) < 0) return;
		let pathG = sbG.append("g")
						.datum(nd)
						.attr("class", "slice")
						
		if(isMobile){
			pathG.on("touchend", clickSBTouch)
		}else{
			pathG.on("click", clickSB)
				.on("mouseover", function(d){setTimeout(sbMOver, 500, d);})
				.on("mouseout", function(d){setTimeout(sbMOut, 500, d);});
		}
		let mainArc = pathG.append('path')
							.attr('class', 'main-arc')
							.style('fill', function(){
								if(nd.depth == 0){
									return "white";
								}else{
									return colors7[arabicAlphabets.indexOf(nd.data.data.start) %7];
								}
							})
							.attr('d', arcSB);
	});
	d3.selectAll(".slice").each(function(d, i){
		let textSize, parameterLimit;
		switch(d.depth){
			case 0:
				textSize = SUNBURST_LEVEL_0_ARABIC_SIZE;
				parameterLimit = 100000; // big number
				break;
			case 1:
				textSize = SUNBURST_LEVEL_1_ARABIC_SIZE;
				parameterLimit = -1; // so that it is always shown
				break;
			case 2:
				if(focusDepth > 0){
					textSize = SUNBURST_LEVEL_2_ARABIC_SIZE_1;
				}else{
					textSize = SUNBURST_LEVEL_2_ARABIC_SIZE_2;
				}
				parameterLimit = LEVEL_2_PARAMETER_LIMIT;
				break;
			case 3:
			
				if(focusDepth > 1){
					textSize = SUNBURST_LEVEL_3_ARABIC_SIZE_1;
				}else{
					textSize = SUNBURST_LEVEL_3_ARABIC_SIZE_1;
				}
				parameterLimit = LEVEL_3_PARAMETER_LIMIT;
		}
		const deltaAngle = xSB(d.x1) - xSB(d.x0);
		const midAngle = xSB(d.x0) + (deltaAngle/2);
		let ang = ((xSB((d.x0 + d.x1) / 2) - Math.PI / 2) / Math.PI * 180);
		let textAngle = (ang > 90) ? 180 + ang : ang;
		centroid = arcSB.centroid(d);
		const r = Math.max(0, (ySB(d.y0) + ySB(d.y1)) / 2);
		const perimeter = r * deltaAngle;		
        const txt = d3.select(this).append('text')
									.attr("x",0)
									.attr("y",0)
									.attr('class', 'arc-text')
									.style("pointer-events","none")
									.style("dominant-baseline","middle")
									.style("text-anchor","middle")
									.style("font-size", textSize)
									.style("display",perimeter < parameterLimit ? "none" : null)
									.text(d.data.id);
		if(d.depth > 0){
			txt.style("font-family","Arabic Typesetting").style("direction","rtl");
		}
		if(d.depth > focusDepth){
			txt.attr("transform", "translate(" + centroid[0] + "," + centroid[1] + ") rotate(" + textAngle + ")");
		}else{
			if(focusDepth == 2 && d.depth == 1){
				
			}else{
				txt.attr("transform", "translate(" + centroid[0] + "," + centroid[1] + ")");
			}
		}
			
	});	
}

function clickSBTouch(d){
	d3.event.preventDefault();
	d3.event.stopPropagation();
	if(!lastTouchClickD){
		sbMOver(d);
	}else{
		let currTime = new Date();
		if(lastTouchClickD === d && currTime - lastTouchClickTime < 750){
			clickSB(d);
		}else{
			sbMOver(d);
		}
	}
	lastTouchClickD = d;
	lastTouchClickTime = new Date();
}

function clickSB(d){
	wordDiv.selectAll("*").remove();
	moreDetailsDiv.selectAll("*").remove();
	rootsSvg.selectAll("*").remove();
	goodNodes = [];
	if(d.parent !== null){
		goodNodes.push(d.parent.data.data.name);
	}
	if(d.children){
		goodNodes.push(d.data.data.name);
		d.children.forEach(function(dd){
			goodNodes.push(dd.data.data.name);
			if(dd.children){
				dd.children.forEach(function(d3){
					goodNodes.push(d3.data.data.name);
					if(d3.children){
						d3.children.forEach(function(d4){
							goodNodes.push(d4.data.data.name);
						});
					}
				});
			}
		});
		setTimeout(function(){
			createSB(d);
		}, 5);
		
	}else{
		setTimeout(function(){
			rootLemmaClicked(d.data.data.name, true);
		}, 5);
	}
}

function noRootLemmaClicked(l, t, changeViewType){
	if(changeViewType){
		viewType = "no_root_ayahs";
	}
	selectedLemma = l;
	selectedType = t;
	let ayahsCovered;
	if(t != ""){
		ayahsCovered = noRootLemmaWordsObj[l][t];
	}else{
		ayahsCovered = noRootLemmaWordsObj[l]["all"];
	}
	//create a new absolute div
	prepareAyahsDiv();
	if(ayahsCovered.length < 10){
		ayahsCovered.forEach(function(ac, ai){
			showAyah({"a":ac, "i":ai, "l":l, "d":ayahsInnerDiv});
		});
	}else{
		for(ai = 0; ai < 10; ai++){
			showAyah({"a":ayahsCovered[ai], "i":ai, "l":l, "d":ayahsInnerDiv});
		}
		setTimeout(showAdditionalAyahs, 10, ayahsCovered, l);
	}
}

function rootLemmaClicked(l, changeViewType){
	if(changeViewType){
		viewType = "root_ayahs";
	}
	
	buttonShowMoreOptions.style("display", "none");
	selectedLemma = l;
	let ayahsCovered = lemmaWithRootWordsObj[l][1].slice();
	prepareAyahsDiv();
	if(ayahsCovered.length < 10){
		ayahsCovered.forEach(function(ac, ai){
			showAyah({"a":ac, "i":ai, "l":l, "d":ayahsInnerDiv});
		});
	}else{
		for(ai = 0; ai < 10; ai++){
			showAyah({"a":ayahsCovered[ai], "i":ai, "l":l, "d":ayahsInnerDiv});
		}
		setTimeout(showAdditionalAyahs, 10, ayahsCovered, l);
	}
}

function moreDetailDivMOver(){
	if(!isMobile){
		disableSbMOver = true;
		disableRectMOver = true;
	}
}

function moreDetailDivMOut(){
	disableSbMOver = false;
	disableRectMOver = false;
	sbMOut();
	_rectMOut();
}

function rectClicked(d){
	disableRectMOver = false;
	_rectMOut();
	if(d.type === "root_word"){
		rootLemmaClicked(d.value, true);
	}else{
		if(d.word_type){
			noRootLemmaClicked(d.value, d.word_type, true);
		}else{
			noRootLemmaClicked(d.value, "", true);
		}
	}
	
}

function rootRectMOver(d){
	setTimeout(_rectMOver, 500, d);	
}

function rootRectMOut(d){
	setTimeout(_rectMOut, 500, d);	
}

function rectMOver(d){
	setTimeout(_rectMOver, 500, d);	
}

function rectMOut(d){
	setTimeout(_rectMOut, 500);	
}

function _rectMOver(d){
	if(disableRectMOver) return;
	moreDetailsDiv.selectAll("*").remove();
	if(d.type === "root_root"){
		let newSvg = moreDetailsDiv.append("svg").attr("width", detailDivW - 25); // to allow for scroll bar
		d3.selectAll(".root_root_" + d.alphabet).style("opacity", function(dIn){
			if(dIn.root_value === d.root_value){
				return 1;
			}else{
				return 0.1;
			}
		});
		let arrToDraw = [], mx = 0;
		let scale = d3.scaleLinear().range([0, detailDivW - 25]);
		// get the lemmas
		rootLemmaObj[d.root_value].forEach(function(ll, li){
			let val = lemmaWithRootWordsObj[ll][0].length;
			arrToDraw.push([ll, val]);
			if(mx < val){
				mx = val;
			}
		});
		scale.domain([0, mx]);
		arrToDraw.sort(function(a,b){
			return b[1] - a[1];
		});
		
		let s = 25, moreThanHalf, rectFill, textFill;
		arrToDraw.forEach(function(a){
			[rectFill, textFill] = getRectAndTextColor(a[1]);
			appendRect(newSvg, {"x":0, "y":(s + 5), "height":20, "width":scale(a[1]), "fill":rectFill, "datum":{"value":a[0], "word_type":d.value}, "click":rectClicked});
			appendText(newSvg, {"x": 2, "y":s, "text":a[0], "size":23, "datum":{"value":a[0], "word_type":d.value}, "click":rectClicked});
			moreThanHalf = scale(a[1]) > ((detailDivW - 25)/2);
			appendText(newSvg, {"x": moreThanHalf ? scale(a[1]) - 2 : scale(a[1]) + 2, "y":s + 19, "text":formatNumber(a[1]), "size":12, "anchor": moreThanHalf ? "end" : "start", "fill": moreThanHalf ? textFill : "black"});		
			s = s + 50;
		});
		newSvg.attr("height", s + 20);
	}
	if(d.type === "root_word"){
		let newDiv = moreDetailsDiv.append("div").attr("width", detailDivW - 25); // to allow for scroll bar
		appendP(newDiv, {"size":descTitleSize * 2, "align":"center", "html":d.value, "family":"Arabic Typesetting"});
		appendP(newDiv, {"size":descSize * 0.75, "html":formatNumber(lemmaWithRootWordsObj[d.value][0].length), "align":"right"});
		appendP(newDiv, {"size":descSize, "html":getMeaningHtml(rootMeaningsObj[d.value][0], descSize)});
		appendP(newDiv, {"size":descSize * 0.75, "html":getMeaningHtml(rootMeaningsObj[d.value][1], descSize * 0.75)});
		d3.selectAll(".root_root_" + d.alphabet).style("opacity", function(dIn){
			if(dIn.value === d.root_value || dIn.value === d.value){
				return 1;
			}else{
				return 0.1;
			}
		});
	}
	if(d.type === "no_root_type"){
		let newSvg = moreDetailsDiv.append("svg").attr("width", detailDivW - 25); // to allow for scroll bar
		d3.selectAll(".no_root_type").style("opacity", function(dIn){
			if(dIn.value === d.value){
				return 1;
			}else{
				return 0.1;
			}
		});
		d3.selectAll(".no_root_lemma").style("opacity", function(dIn){
			if(noRootWordTypeLemmaObj[d.value].indexOf(dIn.value) >= 0){
				return 1;
			}else{
				return 0.1;
			}
		});
		let arrToDraw = [], mx = 0;
		let scale = d3.scaleLinear();
		// get the lemmas
		noRootWordTypeLemmaObj[d.value].forEach(function(ll, li){
			arrToDraw.push([ll, noRootLemmaTypeCount[ll + "_" + d.value]]);
			if(mx < noRootLemmaTypeCount[ll + "_" + d.value]){
					mx = noRootLemmaTypeCount[ll + "_" + d.value];
				}
		});
		scale.domain([0, mx]).range([0, detailDivW - 25]);
		arrToDraw.sort(function(a,b){
			return b[1] - a[1];
		});
		
		let s = 25, moreThanHalf, rectFill, textFill;
		arrToDraw.forEach(function(a){
			[rectFill, textFill] = getRectAndTextColor(a[1]);
			appendRect(newSvg, {"x":0, "y":(s + 5), "height":20, "width":scale(a[1]), "fill":rectFill, "datum":{"value":a[0], "word_type":d.value}, "click":rectClicked});
			appendText(newSvg, {"x": 2, "y":s, "text":a[0], "size":23, "datum":{"value":a[0], "word_type":d.value}, "click":rectClicked});
			moreThanHalf = scale(a[1]) > ((detailDivW - 25)/2);
			appendText(newSvg, {"x": moreThanHalf ? scale(a[1]) - 2 : scale(a[1]) + 2, "y":s + 19, "text":formatNumber(a[1]), "size":12, "anchor": moreThanHalf ? "end" : "start", "fill": moreThanHalf ? textFill : "black"});		
			s = s + 50;
		});
		newSvg.attr("height", s + 20);
	}
	if(d.type === "no_root_lemma"){
		let newDiv = moreDetailsDiv.append("div").attr("width", detailDivW - 25); // to allow for scroll bar
		appendP(newDiv, {"size":descTitleSize * 2, "align":"center", "html":d.value, "family":"Arabic Typesetting"});
		appendP(newDiv, {"size":descSize * 0.75, "html":formatNumber(noRootLemmasCount[d.value]), "align":"right"});
		appendP(newDiv, {"size":descSize, "html":getMeaningHtml(noRootMeaningsObj[d.value][0], descSize)});
		appendP(newDiv, {"size":descSize * 0.75, "html":getMeaningHtml(noRootMeaningsObj[d.value][1], descSize * 0.75)});
		d3.selectAll(".no_root_lemma").style("opacity", function(dIn){
			if(dIn.value === d.value){
				return 1;
			}else{
				return 0.1;
			}
		});
		d3.selectAll(".no_root_type").style("opacity", function(dIn){
			if(noRootLemmaWordTypeObj[d.value].indexOf(dIn.value) >= 0){
				return 1;
			}else{
				return 0.1;
			}
		});
	}
}

function getMeaningHtml(meaning, size){
	if(meaning.indexOf("{") < 0){
		return meaning;
	}else{
		let m;
		meaning.split("{").forEach(function(s, i){
			if(i == 0){
				m = s;
			}else{
				let parts = s.split("}");
				m = m + "<span style=' font-size:" + (1.5 * size) + "px; font-family: Arabic Typesetting;'>" + parts[0] + "</span>";
				m = m + "<span style=' font-size:" + size + "px;'>" + parts[1] + "</span>";
			}
		});
		return m;
	}
}

function _rectMOut(){
	if(disableRectMOver) return;
	d3.selectAll(".root_root").style("opacity", 1);
	d3.selectAll(".no_root_type").style("opacity", 1);
	d3.selectAll(".no_root_lemma").style("opacity", 1);
	moreDetailsDiv.selectAll("*").remove();
}

function sbMOver(d){
	if(disableSbMOver) return;
	wordDiv.selectAll("*").remove();
	moreDetailsDiv.selectAll("*").remove();
	if(d.depth > 0 && d.depth < 3){
		wordDiv.selectAll("*").remove();
		appendP(wordDiv, {"size":descTitleSize * 2, "align":"center", "html":d.data.data.name, "family":"Arabic Typesetting"});
		let ayahsAndVisualsDivPos = localToGlobal(ayahsAndVisualsDiv.node());
		wordDiv.style("left",ayahsAndVisualsDivPos.left)
				.style("top",ayahsAndVisualsDivPos.top - 40);		
	}	
	let arrToDraw = [], mx = 0;
	let scale = d3.scaleLinear();
	if(d.depth < 3){
		/*let newDiv = moreDetailsDiv.append("div").attr("width", detailDivW - 25); // to allow for scroll bar
		appendP(newDiv, {"size":descTitleSize * 2, "align":"center", "html":d.data.data.name, "family":"Arabic Typesetting"});
		appendP(newDiv, {"size":descSize * 0.75, "html":formatNumber(d.value), "align":"right"});*/
		let newSvg = moreDetailsDiv.append("svg").attr("width", detailDivW - 25); // to allow for scroll bar
		d.children.forEach(function(ch){
			arrToDraw.push([ch.data.id, ch.value, ch.data.data.start]);
			if(mx < ch.value){
				mx = ch.value;
			}
		});
		scale.domain([0, mx]).range([0, detailDivW - 25]);
		arrToDraw.sort(function(a,b){
			return b[1] - a[1];
		});
		let s = 20, moreThanHalf;
		arrToDraw.forEach(function(a){
			appendRect(newSvg, {"x":0, "y":(s + 5), "height":20, "width":scale(a[1]), "fill":colors7[arabicAlphabets.indexOf(a[2]) %7]});
			appendText(newSvg, {"x": 2, "y":s, "text":a[0], "size":23});
			moreThanHalf = scale(a[1]) > ((detailDivW - 25)/2);
			appendText(newSvg, {"x": moreThanHalf ? scale(a[1]) - 2 : scale(a[1]) + 2, "y":s + 19, "text":formatNumber(a[1]), "size":12, "anchor": moreThanHalf ? "end" : "start"});		
			s = s + 50;
		});
		newSvg.attr("height", s + 20);
	}else{
		let newDiv = moreDetailsDiv.append("div").attr("width", detailDivW - 25); // to allow for scroll bar
		appendP(newDiv, {"size":descTitleSize * 2, "align":"center", "html":d.data.data.name, "family":"Arabic Typesetting"});
		appendP(newDiv, {"size":descSize * 0.75, "html":formatNumber(lemmaWithRootWordsObj[d.data.data.name][0].length), "align":"right"});
		appendP(newDiv, {"size":descSize, "html":getMeaningHtml(rootMeaningsObj[d.data.data.name][0], descSize)});
		appendP(newDiv, {"size":descSize * 0.75, "html":getMeaningHtml(rootMeaningsObj[d.data.data.name][1], descSize * 0.75)});
	}
}

function appendRect(rectElem, rectObj){
	let rr = rectElem.append("rect");
	if(rectObj.x){
		rr.attr("x", rectObj.x);
	}
	if(rectObj.y){
		rr.attr("y", rectObj.y);
	}
	if(rectObj.height){
		rr.attr("height", rectObj.height);
	}
	if(rectObj.width){
		rr.attr("width", rectObj.width);
	}
	if(rectObj.rx){
		rr.attr("rx", rectObj.rx);
	}
	if(rectObj.class){
		rr.attr("class", rectObj.class);
	}
	if(rectObj.id){
		rr.attr("id", rectObj.id);
	}
	if(rectObj.fill){
		rr.style("fill", rectObj.fill);
	}
	if(rectObj.stroke){
		rr.style("stroke", rectObj.stroke);
	}
	if(rectObj.strokeWidth){
		rr.style("stroke-width", rectObj.strokeWidth);
	}
	if(rectObj.datum){
		rr.datum(rectObj.datum);
	}
	if(rectObj.click){
		rr.on("click", rectObj.click);
	}
	if(rectObj.mouseover){
		rr.on("mouseover", rectObj.mouseover);
	}
	if(rectObj.mouseout){
		rr.on("mouseout", rectObj.mouseout);
	}
	if(rectObj.touchend){
		rr.on("touchend", rectObj.touchend);
	}
	return rr;
}

function appendText(textElem, textObj){
	let tt = textElem.append("text");	
	if(textObj.x){
		tt.attr("x", textObj.x);
	}
	if(textObj.y){
		tt.attr("y", textObj.y);
	}
	if(textObj.text){
		tt.html(textObj.text);
	}
	if(textObj.size){
		if(textObj.size > 48){
			textObj.size = 48;
		}
		if(textObj.size < 6){
			textObj.size = 6;
		}
		tt.style("font-size", textObj.size + "px");
	}
	if(textObj.fill){
		tt.style("fill", textObj.fill);
	}
	if(textObj.class){
		tt.attr("class", textObj.class);
	}
	if(textObj.family){
		tt.style("font-family", textObj.family);
	}
	if(textObj.anchor){
		tt.style("text-anchor", textObj.anchor);
	}
	if(textObj.stretch){
		tt.style("font-stretch", textObj.stretch);
	}
	if(textObj.weight){
		tt.style("font-weight", textObj.weight);
	}
	if(textObj.datum){
		tt.datum(textObj.datum);
	}
	if(textObj.click){
		tt.on("click", textObj.click);
	}
	if(textObj.decoration){
		tt.style("text-decoration", textObj.decoration);
	}
	if(textObj.baseline){
		tt.style("alignment-baseline", textObj.baseline);
	}
	return tt;
}

function appendSpan(sElem, sObj){
	let ss = sElem.append("span");
	if(sObj.id){
		ss.attr("id", "span_" + sObj.id);
	}
	if(sObj.html){
		ss.html(sObj.html);
	}
	if(sObj.color){
		ss.style("color", sObj.color);
	}
	if(sObj.size){
		ss.style("font-size", sObj.size);
	}
	if(sObj.family){
		ss.style("font-family", sObj.family);
	}
	if(sObj.datum){
		ss.datum(sObj.datum);
	}
	if(sObj.mouseover){
		ss.on("mouseover", sObj.mouseover);
	}
	if(sObj.mouseout){
		ss.on("mouseout", sObj.mouseout);
	}
	if(sObj.click){
		ss.on("click", sObj.click);
	}
	if(sObj.touchend){
		ss.on("touchend", sObj.touchend);
	}
	
	return ss;
}

function appendP(pElem, pObj){
	let pp = pElem.append("p");
	if(pObj.class){
		pp.attr("class", pObj.class);
	}
	if(pObj.id){
		pp.attr("id", pObj.id);
	}
	if(pObj.size){
		if(pObj.size > 48){
			pObj.size = 48;
		}
		if(pObj.size < 8){
			pObj.size = 8;
		}
		pp.style("font-size", pObj.size + "px");
	}
	if(pObj.marginBottom){
		pp.style("margin-bottom", pObj.marginBottom + "px");
	}
	if(pObj.marginTop){
		pp.style("margin-top", pObj.marginTop + "px");
	}
	if(pObj.family){
		pp.style("font-family", pObj.family);
	}
	if(pObj.direction){
		pp.style("direction", pObj.direction);
	}
	if(pObj.align){
		pp.style("text-align", pObj.align);
	}
	if(pObj.color){
		pp.style("color", pObj.color);
	}
	if(pObj.weight){
		pp.style("font-weight", pObj.weight);
	}
	if(pObj.html){
		pp.html(pObj.html);
	}
	return pp;
}

function sbMOut(){
	if(disableSbMOver) return;
	moreDetailsDiv.selectAll("*").remove();
	wordDiv.selectAll("*").remove();
	wordDiv.style("left","-1000px").style("top","-1000px");
}

function showAdditionalAyahs(ac, l){
	for(ai = 10; ai < ac.length; ai++){
		showAyah({"a":ac[ai], "i":ai, "l":l, "d":ayahsInnerDiv});
	}
}		

function showAyah(obj){ // a is ayah number, i is the index of ayah in displayed ayahs, l is the lemma or basic word, t is type
	
	pArabic = appendP(obj.d, {"class":"ayah_arabic", "id":"a_" + obj.a, "size":SURAH_ARABIC_TEXT_SIZE, "marginBottom":5, "family":"Arabic Typesetting", "direction":"rtl"});
	
	if(obj.i == 0){
		pArabic.style("margin-top","12px");
	}
	pEnglish = appendP(obj.d, {"class":"ayah_english", "marginTop":5, "align":"right", "id":"e_" + obj.a});
	
	surahNumSpan = appendSpan(pEnglish, {"html":"[" + obj.a.split("-").join(":") + "]", "color": textColor});
	
	if(obj.l != "no_lemma"){
		surahNumSpan.style("color","blue")
					.style("text-decoration","underline")
					.datum(obj.a)
					.on("click",surahClicked);
	}
	
	appendSpan(pEnglish, {"html":" "});
	for(zz = 1; zz <= ayahWordNumsObj[obj.a]; zz++){
		if(isMobile){
			sAra = appendSpan(pArabic, {"html":words[obj.a+"-"+zz][WORD_ARABIC] + " ", "id":obj.a+"-"+zz,"datum":obj.a+"-"+zz, "touchend":wordClickTouch});
		}else{
			sAra = appendSpan(pArabic, {"html":words[obj.a+"-"+zz][WORD_ARABIC] + " ", "id":obj.a+"-"+zz, "datum":obj.a+"-"+zz, "mouseover":wordMouseOver, "mouseout":wordMouseOut, "click":wordClick});
		}
		
		if(typeof pauseMarksObj[obj.a+"-"+zz] != "undefined"){
			appendSpan(pArabic, {"color":textColor, "html":pauseMarksObj[obj.a+"-"+zz] + " ", "datum":pauseMarksObj[obj.a+"-"+zz]});
			// , "mouseover":pauseMouseOver, "mouseout":pauseMouseOut
		}
		
		/*
		if(typeof pauseMarksObj[obj.a+"-"+zz] != "undefined"){
			appendSpan(sAra, {"color":"red", "html":pauseMarksObj[obj.a+"-"+zz]});
		}*/
		
		sEng = appendSpan(pEnglish, {"html":words[obj.a +"-"+zz][WORD_ENG_MEANING] + " "});
		if(words[obj.a+"-"+zz][WORD_ARABIC_LEMMA] == obj.l){
			if(obj.t){
				if(words[obj.a+"-"+zz][WORD_INFO][WORD_INFO_PART_OF_SPEECH] == obj.t){
					sAra.style("color",lightText);
					sEng.style("color",lightText);
				}else{
					sAra.style("color",textColor);
					sEng.style("color",textColor);
				}
			}else{
				sAra.style("color",lightText);
				sEng.style("color",lightText);
			}
		}else{
			sAra.style("color",textColor);
			sEng.style("color",textColor);						
		}
	}			
}

function wordClickTouch(d){
	d3.event.preventDefault();
	d3.event.stopPropagation();
	ayahsInnerDiv.selectAll("span").style("background-color",null);
	if(!lastTouchClickD){
		wordMouseOver(d);
	}else{
		let currTime = new Date();
		if(lastTouchClickD === d && currTime - lastTouchClickTime < 500){
			wordClick(d);
		}else{
			wordMouseOver(d);
		}
	}
	lastTouchClickD = d;
	lastTouchClickTime = new Date();
}

function wordClick(d){
	let r = words[d][WORD_ARABIC_ROOT],
		l = words[d][WORD_ARABIC_LEMMA],
		t = words[d][WORD_INFO][WORD_INFO_PART_OF_SPEECH];
	if(r != ""){
		rootLemmaClicked(l, false);
	}else{
		noRootLemmaClicked(l, "", false);
	}
}

function pauseMouseOver(d){
	tooltip.selectAll("*").remove();
	let pauseP = appendP(tooltip, {"marginTop":2, "marginBottom":2, "weight":"bold"});
	appendSpan(pauseP, {"html":d + " ", "size":SURAH_ARABIC_TEXT_SIZE});
	appendSpan(pauseP, {"html":pauseMarksInfo[d][0]});
			
	if(pauseMarksInfo[d][1] != ""){	
		appendP(tooltip, {"marginTop":2, "marginBottom":2, "html":pauseMarksInfo[d][1]});					
	}
	tooltip.style("left", (d3.event.pageX + 10) + "px")
			.style("top", (d3.event.pageY + 5) + "px")
			.style("opacity",0.95);	
}

function pauseMouseOut(){
	tooltip.style("opacity",1)
			.style("left","-1000px")
			.style("top","-1000px");
}

function wordMouseOver(d){
	moreDetailsDiv.selectAll("*").remove();
	d3.select("#span_" + d).style("background-color","yellow");
		
	if(words[d][WORD_ARABIC_ROOT] != ""){
		appendP(moreDetailsDiv, {"marginBottom":2, "marginTop":2, "html":"ROOT:", "size":moreDetailsLabelSize});
		appendP(moreDetailsDiv, {"marginBottom":2, "marginTop":2, "align":"center", "color":textColor, "family":"Arabic Typesetting", "size":moreDetailsArabicSize, "html":words[d][WORD_ARABIC_ROOT]});			
	}
	
	appendP(moreDetailsDiv, {"marginBottom":2, "marginTop":12, "html":"BASIC WORD:", "size":moreDetailsLabelSize});
	appendP(moreDetailsDiv, {"align":"center", "marginBottom":2, "color":textColor, "marginTop":2, "size":moreDetailsArabicSize, "html":words[d][WORD_ARABIC_LEMMA], "family":"Arabic Typesetting"});
	
	appendP(moreDetailsDiv, {"marginBottom":2, "marginTop":12, "html":"WORD PARTS:", "size":moreDetailsLabelSize});
	pElem = appendP(moreDetailsDiv, {"align":"center", "size":moreDetailsArabicSize, "family":"Arabic Typesetting", "marginBottom":2, "marginTop":2});
	posTable = moreDetailsDiv.append("table").style("margin","0 auto").append("tbody");
	partsRow = posTable.append("tr");
	posRow = posTable.append("tr");
		
	appendP(moreDetailsDiv, {"marginBottom":2, "marginTop":12, "html":"MEANING:", "size":moreDetailsLabelSize});
	
	appendP(moreDetailsDiv, {"align":"center", "marginBottom":2, "color":textColor, "marginTop":2, "size":moreDetailsEnglishSize, "html":words[d][WORD_ENG_MEANING]});
	
	let nn = +words[d][WORD_NUM_PARTS];
	prefixStart = 0; 
	stemStart = 0;
	suffixStart = 0;
	for(zz = 1; zz <= nn; zz++){
		appendSpan(pElem, {"color":colors10[zz - 1], "html":fixedwordPart(d,zz)});
		
		appendP(partsRow.append("td").style("padding-left","5px").style("padding-left","5px"),
		{"marginTop":"3px", "size":moreDetailsInfoSize, "marginBottom":2, "align":"center", "color": colors10[nn - zz], "html":wordParts[d + "-" + (nn - zz + 1)][WORD_PART_INFO][INFO_PART_OF_WORD]});
		
		appendP(posRow.append("td").style("padding-left","5px").style("padding-left","5px"),
		{"align":"center", "marginTop":2, "size":moreDetailsPosSize, "marginBottom":0, "color": colors10[nn - zz], "html":wordPartsInfoObj[wordParts[d + "-" + (nn - zz + 1)][WORD_PART_INFO][INFO_PART_OF_SPEECH]]});
	}
}

function fixedwordPart(wordRef, partNum){
	prePart = wordParts[wordRef + "-" + (partNum - 1)];
	txt = wordParts[wordRef + "-" + partNum][WORD_PART_ARABIC];
	postPart = wordParts[wordRef + "-" + (partNum + 1)];
	
	laTxt = findLastAlphabet(txt);
	
	if(typeof(prePart) != "undefined"){// pre part exists
		// find the last alphabet
		preText = prePart[WORD_PART_ARABIC];
		la = findLastAlphabet(preText);
		if(nonJoiningAlphabets.indexOf(la) < 0 && txt != ""){
			txt = "&zwj;" + txt;
		}
	}
	
	if(typeof(postPart) != "undefined"){// post part exists
		postText = postPart[WORD_PART_ARABIC];
		if(nonJoiningAlphabets.indexOf(laTxt) < 0 && postText !=""){
			txt = txt + "&zwj;";
		}
	}
	return txt;		
}

function findLastAlphabet(ww){
	var nn = ww.length - 1;
	alphabetFound = false;
	alphabet = "";
	while(!alphabetFound && nn >= 0){
		if(arabicAlphabets.indexOf(ww[nn]) >= 0){
			alphabetFound = true;
			alphabet = ww[nn];
		}
		nn = nn - 1;
	}
	return alphabet;
}

function findFirstAlphabet(ww){
	var nn = 0;
	alphabetFound = false;
	alphabet = "";
	while(!alphabetFound && nn < ww.length){
		if(arabicAlphabets.indexOf(ww[nn]) >= 0){
			alphabetFound = true;
			alphabet = ww[nn];
		}
		nn = nn + 1;
	}
	return alphabet;
}

function wordMouseOut(){
	//return;
	d3.select(this).style("background-color",null);
	moreDetailsDiv.selectAll("*").remove();
}

function showMain(){
	helpDiv.style("display", "none");
	disclaimerAndFooterDiv.style("display", "none");
	mainDiv.style("display", null);
	
}

function showHelp(){
	mainDiv.style("display", "none");
	helpDiv.style("display", null);
}

function showDisclaimer(){
	mainDiv.style("display", "none");
	disclaimerAndFooterDiv.style("display", null);	
}

function mobileAndTabletcheck(){
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};
