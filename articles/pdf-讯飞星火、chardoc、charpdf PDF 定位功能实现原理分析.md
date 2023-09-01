# 讯飞星火、chardoc、charpdf PDF 定位功能实现原理分析

他们三个前端使用的都是 pdfjs 。

## 科大讯飞-讯飞星火 文档问答

![讯飞星火效果图](http://storage.icyc.cc/p/20230901/rc-upload-1693564792530-2.jpeg)

选择完文件，展示默认的拆段策略，还提供了自定义拆段。

技术核心：修改 pdfjs 源码，添加 updatePagesMatches 事件，自定义 matches ，通过高亮模块 TextHighlighter 实现选中。

技术实现思路：前端掉接口拿拆分的所有段落，通过 pdfjs 拿到总页数，循环每一页 getTextContent 拿文本，通过拆段的长度和每一页内容长度对比，生成全文每一段的 Matches 。

matches 的数据结构长这个样子：

![讯飞星火 matches](http://storage.icyc.cc/p/20230901/rc-upload-1693564792530-5.jpeg)

附上调试的源码：

业务代码部分： webViewerLoad 渲染 pdf ， setSectionMatches 生成 Matches

```javascript
function webViewerLoad(x_, $P) {
  let eme;
  PDFViewerApplication.appConfig && PDFViewerApplication.close();
  const zP = getViewerConfiguration($P);
  return (
    (eme = PDFViewerApplication == null ? void 0 : PDFViewerApplication.eventBus) == null ||
      eme.dispatch('updatetextlayermatches', {
        pagesMatches: {},
      }),
    PDFViewerApplication.run(zP, x_)
  );
}
let pagesMatches = {};
async function setSectionMatches(x_, $P, zP) {
  let sme, lme, cme;
  const eme = /\s|\u0000/g;
  pagesMatches = {};
  let tme = 0,
    rme = 0,
    nme = 0,
    ome = 0;
  const ime = PDFViewerApplication.pdfDocument;
  if (!(x_ != null && x_.length)) {
    clearSectionMatches();
    return;
  }
  if (!ime) return;
  let ame;
  for (let ume = 0; ume < x_.length; ume++) {
    const { trunkContent: dme } = x_[ume];
    if (!dme || !dme.length) continue;
    let mme = normalizeUnicode(dme).replace(eme, '').length;
    e: for (tme; tme < ime.numPages; tme++) {
      pagesMatches[tme] = pagesMatches[tme] || [];
      const hme = pagesMatches[tme],
        fme = {
          sectionIndex: ume,
          className: `section-${ume} section-color-${ume % colors.length} `,
          begin: {
            divIdx: rme,
            offset: ome,
          },
        };
      ame ||
        (ame != null && ame.length) ||
        (ame = (await (await ime.getPage(tme + 1)).getTextContent()).items.map(Eme => normalizeUnicode(Eme.str)));
      const pme = ame.join('').replace(eme, '').length;
      if (pme <= mme && rme === 0 && nme === 0) {
        if (
          ((rme = ame.length),
          (fme.end = {
            divIdx: rme - 1,
            offset: (sme = ame[rme - 1]) == null ? void 0 : sme.length,
          }),
          hme.push(fme),
          (mme -= pme),
          (rme = 0),
          (nme = 0),
          (ome = 0),
          mme === 0)
        ) {
          (tme += 1), (ame = void 0);
          break e;
        }
      } else {
        for (rme; rme < ame.length; rme++) {
          const gme = ame[rme],
            Eme = gme.replace(eme, '').length - nme;
          if (Eme > mme) {
            let bme = 0;
            for (ome; ome < gme.length && (gme.charAt(ome) !== ' ' && (bme += 1), !(bme >= mme)); ome++);
            (ome = ome + 1),
              (fme.end = {
                divIdx: rme,
                offset: ome,
              }),
              (nme = nme + mme),
              hme.push(fme),
              (mme = 0);
            break e;
          } else if (Eme === mme) {
            (fme.end = {
              divIdx: rme,
              offset: gme.length,
            }),
              (nme = 0),
              (ome = 0),
              rme++,
              rme >= ame.length && (tme++, (ame = void 0), (rme = 0)),
              hme.push(fme),
              (mme = 0);
            break e;
          } else (mme = mme - Eme), (nme = 0), (ome = 0);
        }
        (fme.end = {
          divIdx: rme - 1,
          offset: (lme = ame[rme - 1]) == null ? void 0 : lme.length,
        }),
          (rme = 0),
          (nme = 0),
          (ome = 0),
          hme.push(fme);
      }
      ame = void 0;
    }
  }
  return (
    $P
      ? (cme = PDFViewerApplication == null ? void 0 : PDFViewerApplication.eventBus) == null ||
        cme.dispatch('updatePagesMatches', {
          pagesMatches,
        })
      : zP !== void 0 && scrollElementToView(zP),
    pagesMatches
  );
}
function clearSectionMatches() {
  let x_;
  (x_ = PDFViewerApplication == null ? void 0 : PDFViewerApplication.eventBus) == null ||
    x_.dispatch('updatePagesMatches', {
      pagesMatches: {},
    });
}
function scrollElementToView(x_) {
  let tme;
  const $P = {};
  if (x_ === void 0) return;
  let zP = -1,
    eme = !1;
  for (let rme in pagesMatches) {
    rme = Number(rme);
    for (let nme = 0; nme < pagesMatches[rme].length; nme++) {
      const ome = pagesMatches[rme][nme];
      if (ome.sectionIndex === x_)
        zP < 0 && ((zP = PDFViewerApplication.pdfViewer.currentPageNumber = rme + 1), (eme = !0)),
          ($P[rme] = $P[rme] || []),
          $P[rme].push({
            ...ome,
            isSelected: eme,
            className: `section-${x_} section-color-selected `,
          }),
          (eme = !1);
      else if (ome.sectionIndex > x_) break;
    }
  }
  (tme = PDFViewerApplication == null ? void 0 : PDFViewerApplication.eventBus) == null ||
    tme.dispatch('updatePagesMatches', {
      pagesMatches: $P,
    });
}

```

源码修改部分：

如果要改造自己的代码，constructor 修改一下， ```_merageMatches``` ```_renderMatches``` ```_updateMatches``` 直接复制就行

```javascript
let defaultPagesMatches;
class TextHighlighter {
  constructor({ findController: $P, eventBus: zP, pageIndex: eme }) {
    this._onUpdatePagesMatches = $P => {
      (defaultPagesMatches = $P.pagesMatches), this._updateMatches(!1), sessionStorage.removeItem('pdfFindBar');;
    }

    // other code ...

    this.eventBus._on('updatePagesMatches', this._onUpdatePagesMatches);;
  }
  _merageMatches($P, zP) {
    for (; zP.length;) {
      const eme = zP[0],
        tme = $P.findIndex(
          nme =>
            (nme.begin.divIdx < eme.begin.divIdx ||
              (nme.begin.divIdx === eme.begin.divIdx && nme.begin.offset <= eme.begin.offset)) &&
            (nme.end.divIdx > eme.begin.divIdx ||
              (nme.end.divIdx === eme.begin.divIdx && nme.end.offset > eme.begin.offset)),
        ),
        rme = $P.findIndex(
          nme =>
            (nme.begin.divIdx < eme.end.divIdx ||
              (nme.begin.divIdx === eme.end.divIdx && nme.begin.offset <= eme.end.offset)) &&
            (nme.end.divIdx > eme.end.divIdx ||
              (nme.end.divIdx === eme.end.divIdx && nme.end.offset >= eme.end.offset)),
        );
      if (rme === -1 && tme === -1) {
        $P.push({
          ...eme,
        }),
          zP.shift();
        continue;;
      }
      if (rme !== 1 && tme !== -1 && rme !== tme) {
        ($P[tme].end = {
          ...eme.begin,
        }),
          ($P[rme].begin = {
            ...eme.end,
          }),
          $P.splice(tme + 1, rme - tme - 1, eme),
          zP.shift();
        continue;;
      }
      if (rme !== -1 && tme !== -1 && rme === tme) {
        $P.splice(
          tme,
          1,
          {
            ...$P[tme],
            end: {
              ...eme.begin,
            },
          },
          eme,
          {
            ...$P[tme],
            begin: {
              ...eme.end,
            },
          },
        ),
          zP.shift();
        continue;;
      }
      if (rme !== -1 && tme === -1) {
        ($P[rme].begin = {
          ...eme.end,
        }),
          $P.splice(0, 0, eme),
          zP.shift();
        continue;;
      }
      if (rme === -1 && tme !== -1) {
        ($P[tme].end = {
          ...eme.begin,
        }),
          $P.push(eme),
          zP.shift();
        continue;;
      }
      zP.shift(), console.log('没有处理的', rme, tme);;
    }
    $P.sort((eme, tme) => eme.begin.divIdx - tme.begin.divIdx);;
  }
  _renderMatches($P) {
    let gme;
    if ($P.length === 0) return;
    const zP = sessionStorage.getItem('pdfFindBar') !== 'pdfFindBar',
      { textContentItemsStr: eme, textDivs: tme, findController: rme, pageIdx: nme } = this;
    if (!(tme != null && tme.length)) return;
    const ome = rme != null && rme.selected ? nme === rme.selected.pageIdx : !0,
      ime = ((gme = rme == null ? void 0 : rme.selected) == null ? void 0 : gme.matchIdx) ?? 0;
    let ame = null;
    const sme = {
      divIdx: -1,
      offset: void 0,
    };
    function lme(vme, Eme, bme) {
      const Cme = vme.divIdx;
      if (tme[Cme]) return (tme[Cme].textContent = ''), cme(Cme, 0, vme.offset, Eme, bme);;
    }
    function cme(vme, Eme, bme, Cme, xme) {
      let Tme = tme[vme];
      if (!Tme) return;
      if (Tme.nodeType === Node.TEXT_NODE) {
        const Nme = document.createElement('span');
        Tme.before(Nme), Nme.append(Tme), (tme[vme] = Nme), (Tme = Nme);;
      }
      const wme = eme[vme].substring(Eme, bme),
        Ome = document.createTextNode(wme);
      if (Cme) {
        const Nme = document.createElement('span');
        if (xme && Nme) for (let $me in xme) Nme.style[$me] = xme[$me];
        return (
          (Nme.className = `${Cme} appended`),
          Nme.append(Ome),
          Tme.append(Nme),
          Cme.includes('selected') ? Nme.offsetLeft : 0;
        );
      }
      return Tme.append(Ome), 0;;
    }
    let ume = ime,
      dme = ume + 1;
    (ume = 0), (dme = $P.length);
    let mme = -1,
      hme = -1,
      fme,
      pme = -1;
    for (let vme = ume; vme < dme; vme++) {
      const Eme = $P[vme],
        bme = Eme.begin;
      if (bme.divIdx === mme && bme.offset === hme) continue;
      (mme = bme.divIdx), (hme = bme.offset);
      const Cme = Eme.end;
      Eme.sectionIndex === void 0 && (pme += 1);
      const xme = zP ? Eme.isSelected : ome && pme === ime,
        Tme = ' ' + Eme.className;
      if (
        (!ame || bme.divIdx !== ame.divIdx
          ? (ame !== null && cme(ame.divIdx, ame.offset, sme.offset), lme(bme))
          : cme(ame.divIdx, ame.offset, bme.offset),
          bme.divIdx === Cme.divIdx)
      )
        cme(bme.divIdx, bme.offset, Cme.offset, 'highlight' + Tme, Eme.styles);
      else {
        cme(bme.divIdx, bme.offset, sme.offset, 'highlight begin' + Tme, Eme.styles);
        for (let wme = bme.divIdx + 1, Ome = Cme.divIdx; wme < Ome; wme++)
          if (tme[wme]) {
            if (Eme.styles) for (let Nme in Eme.styles) tme[wme].style[Nme] = Eme.styles[Nme];
            tme[wme].className = 'highlight middle' + Tme;;
          }
        lme(Cme, 'highlight end' + Tme, Eme.styles);;
      }
      if (((ame = Cme), !fme && xme)) {
        let wme = bme.divIdx;
        for (; !eme[wme] && wme <= Cme.divIdx;) wme++;
        fme = tme[wme];;
      }
    }
    fme &&
      rme &&
      rme.scrollMatchIntoView({
        element: fme,
        selectedLeft: 0,
        pageIndex: nme,
        matchIndex: ime,
      }),
      ame && cme(ame.divIdx, ame.offset, sme.offset);;
  }
  _updateMatches($P = !1) {
    if (!this.enabled && !$P) return;
    const { findController: zP, pageIdx: eme } = this,
      { textContentItemsStr: tme, textDivs: rme, matches: nme = [] } = this;
    for (let ime = 0, ame = nme.length; ime < ame; ime++) {
      const sme = nme[ime],
        lme = sme.begin.divIdx;
      for (let cme = lme, ume = sme.end.divIdx; cme <= ume; cme++) {
        const dme = rme[cme];
        (dme.textContent = tme[cme]), (dme.className = '');;
      }
    }
    const ome = [...(defaultPagesMatches == null ? void 0 : defaultPagesMatches[this.pageIdx]) || []];
    if (zP != null && zP.highlightMatches && !$P) {
      const ime = zP.pageMatches[eme] || null,
        ame = zP.pageMatchesLength[eme] || null,
        sme = this._convertMatches(ime, ame),
        lme = zP.selected.matchIdx;
      eme === zP.selected.pageIdx && sme[lme] && (sme[lme].className = 'selected'),
        this._merageMatches(ome, sme),
        (this.matches = ome),
        this._renderMatches(ome || []);
      return;;
    }
    (this.matches = ome), this._renderMatches(ome || []);;
  }
}

```

## ChatDOC 文档问答

效果图：

![chardoc 效果](http://storage.icyc.cc/p/20230901/rc-upload-1693564792530-14.jpeg)

ChatDOC 使用更加精湛，用了注释层 annotationLayer 。后续所有的鼠标移动效果、选中效果、定位效果都基于这一层。

推测在上传文档后，后端分析文档，将 pdf 内文字分段后，添加到 annotationLayer 。

![chardoc html](http://storage.icyc.cc/p/20230901/rc-upload-1693564792530-8.jpeg)



## chatpdf


