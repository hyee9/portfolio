$(document).ready(function () {
  const scrollTop = () => $(window).scrollTop();
  const scrollBottom = () => scrollTop() + $(window).height();

  // ✅ 스크롤 이벤트 처리
  $(window).on('scroll', function () {
    const isScrolled = scrollTop() > 550;

    // 배경 숨김
    $('.sc-main').toggleClass('hide-bg', isScrolled);

    // 이미지 src 교체
    const targetImg = $('img[src$="12.png"], img[src$="12_1.png"]');
    targetImg.attr('src', isScrolled ? './assets/images/12_1.png' : './assets/images/12.png');

    // 선 색상 변경
    $('.main_content_line_group [class^=lineG] [class^=line]').toggleClass('line--white', isScrolled);
  });

  // ✅ 초기 스크롤 상태 적용
  $(window).trigger('scroll');

  // ✅ 이미지 애니메이션 (IntersectionObserver)
  const imgs = document.querySelectorAll('.text_content img');
  const imgObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle('animate', entry.isIntersecting);
    });
  }, { threshold: 0.3 });
  imgs.forEach(img => imgObserver.observe(img));

  // ✅ sc-work 진입 시 클래스 추가
  const aboutSection = document.querySelector('.sc-work');
  const lineObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) aboutSection.classList.add('active');
    });
  }, { threshold: 0.3 });
  lineObserver.observe(aboutSection);
});

// ✅ GSAP 애니메이션 시작
gsap.registerPlugin(ScrollTrigger);

// ✅ 배너 롤링
if (document.querySelector('.sw-banner')) {
  roll(".sw-banner .banner-text", { duration: 25 });
  function roll(targets, vars) {
    vars ||= {};
    vars.ease ||= "none";
    const tl = gsap.timeline({
      repeat: -1,
      onReverseComplete() {
        this.totalTime(this.rawTime() + this.duration() * 10);
      }
    });
    const elements = gsap.utils.toArray(targets);
    const clones = elements.map(el => {
      const clone = el.cloneNode(true);
      el.parentNode.appendChild(clone);
      return clone;
    });
    const positionClones = () => elements.forEach((el, i) => {
      gsap.set(clones[i], {
        position: "absolute",
        top: el.offsetTop,
        left: el.offsetLeft + el.offsetWidth
      });
    });
    positionClones();
    elements.forEach((el, i) => {
      tl.to([el, clones[i]], { xPercent: -100, ...vars }, 0);
    });
    window.addEventListener("resize", () => {
      const time = tl.totalTime();
      tl.totalTime(0);
      positionClones();
      tl.totalTime(time);
    });
    return tl;
  }
}

const gridTL = gsap.timeline({
  scrollTrigger: {
    trigger: ".sc-main",
    start: "top 80%",
    toggleActions: "play none none none"
  }
});

gridTL
  .to(".v-line", { scaleY: 1, duration: 1, stagger: 0.1, ease: "power3.out" }, 0)
  .to(".h-line", { scaleX: 1, duration: 1, stagger: 0.1, ease: "power3.out" }, 0.2)
  .to(".grid-item", {
    opacity: 1,
    scale: 1,
    stagger: 0.1,
    duration: 0.8,
    ease: "power3.out"
  }, 0.5);


gsap.timeline({
  scrollTrigger: {
    trigger: ".sc-design",
    start: "top 90%",
    end: "top top+=100",
    toggleActions: "play none none none",
  }
}).to(".sc-design .line3", {
  scaleX: 1,
  ease: "power3.out"
});


// ✅ sc-work 라인
gsap.timeline({
  scrollTrigger: {
    trigger: ".sc-work",
    start: "top 90%",
    end: "top top+=100",
    toggleActions: "play none none none",
  }
}).to(".sc-work .line3", {
  scaleX: 1,
  ease: "power3.out"
});

// ✅ sc-about 라인 + 텍스트
gsap.timeline({
  scrollTrigger: {
    trigger: ".sc-about",
    start: "top 80%",
    toggleActions: "play none none none"
  }
})
.to(".sc-about .line", { height: 150, duration: 1, ease: "power2.out" })
.to(".sc-about .line2", { scaleX: 1, duration: 1, ease: "power2.out" })
.to(".sc-about .title", { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" })
.to(".sc-about .top_dsce", { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, "-=1")
.to(".sc-about .b_content", { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, "-=1")
.to(".sc-about .link_content", { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, "-=1");

// ✅ sc-contact 라인 + 텍스트
const tlContact = gsap.timeline({
  scrollTrigger: {
    trigger: ".sc-contact",
    start: "top 30%",
    end: "top center",
    toggleActions: "play none none none", // ✔ fixed animation
  }
});
tlContact
.to(".sc-contact .line2", { scaleX: 1, ease: "power3.out" }, 0,1)
.to(".sc-contact .line", { height: 400, ease: "power3.out" }, 0.5)
.to(".sc-contact .line3", { scaleX: 1, ease: "power3.out" }, 0.6);

gsap.timeline({
  scrollTrigger: {
    trigger: ".sc-contact",
    start: "top 30%",
    end: "top center",
    toggleActions: "play none none none", // ✔ fixed animation
  }
})
.to(".sc-contact .name", { opacity: 1, y: 0, duration: 1.4, ease: "power3.out" })
.to(".sc-contact .email", { opacity: 1, y: 0, stagger: 0.3, duration: 1.4, ease: "power3.out" }, "-=1")
.to(".sc-contact .num", { opacity: 1, y: 0, stagger: 0.3, duration: 1.4, ease: "power3.out" }, "-=1");


// ✅ 컬럼 애니메이션 (PC only)
ScrollTrigger.matchMedia({
  "(min-width: 1001px)": function () {
    const targets = [
      { selector: ".block_centent", fromY: 160 },
      { selector: ".block_centent1", fromY: 100 }
    ];

    targets.forEach(({ selector, fromY }) => {
      gsap.utils.toArray(selector).forEach(el => {
        gsap.fromTo(el, { y: fromY }, {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top center",  // scroll-start 가 viewport 의 중간으로 위치
            end: "top top+300px",
            scrub: true
          }
        });
      });
    });
  }
});

// ✅ 아이콘 회전
gsap.to(".icon-content", {
  rotation: 360,
  ease: "none",
  scrollTrigger: {
    trigger: ".icon-content",
    start: "top 40%",
    end: "bottom top",
    scrub: 1,
  }
});

gsap.timeline({
  scrollTrigger: {
    trigger: ".sc-main",
    start: "top center",
    toggleActions: "play none none none",
  }
})
.to(".line5", { scaleY: 1, duration: 1, transformOrigin: "top", ease: "power3.out" })
.to(".line6", { scaleY: 1, duration: 1, transformOrigin: "top", ease: "power3.out" }, "-=0.8")
.to(".line7", { scaleX: 1, duration: 1, transformOrigin: "left", ease: "power3.out" }, "-=0.8")
.to(".line8", { scaleX: 1, duration: 1, transformOrigin: "left", ease: "power3.out" }, "-=0.8");

// ✅ h2에 일렁이는 모션 적용
$('.text_content').each(function () {
  gsap.fromTo($(this).find('h2'), 
    {
      y: 40,         
      skewY: 9,       
      scale: 0.95,    
      opacity: 0.1   
    },
    {
      y: 0,
      skewY: 0,
      scale: 1,
      opacity: 1,     
      duration: 1.4,
      ease: "power3.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: this,
        start: "top 85%",
        toggleActions: "play reset play reset", 
        markers: false
      }
    }
  );
});

gsap.fromTo(".img-centent img", 
  {
    y: -60,         // 위에서 시작
    opacity: 0,     // 투명 시작
  },
  {
    y: 0,
    opacity: 1,
    scale: 1,
    duration: 1.4,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".img-centent",
      start: "top 90%",
      toggleActions: "play reset play reset" // 진입 시 다시 가능
    }
  }
);
gsap.fromTo(".img-area img", 
  {
    x: -60,         // 위에서 시작
    opacity: 0,     // 투명 시작
  },
  {
    x: 0,
    opacity: 1,
    scale: 1,
    duration: 1.4,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".img-centent",
      start: "top 90%",
      toggleActions: "play reset play reset" // 진입 시 다시 가능
    }
  }
);

document.querySelectorAll('.gnb-item').forEach(item => {
  item.addEventListener('click', function (e) {
    e.preventDefault(); // 기본 동작 막기

    const targetName = item.dataset.menu; // ex: "about"
    const section = document.querySelector(`.sc-${targetName}`);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});


// 메인 이미지
const lines = document.querySelectorAll('[class^="lineG"] [class^="line"]');
gsap.set(lines, { scale: 0, opacity: 0 });
gsap.to(lines, {
  scale: 1,
  opacity: 1,
  stagger: 0.05,
  ease: "power3.out"
});

    const mainLines = document.querySelectorAll('[class^="lineG"] [class^="line"]');
    gsap.set(mainLines, { scale: 0, opacity: 0 });

    gsap.timeline({
      scrollTrigger: {
        trigger: ".sc-main",
        start: "top 80%",
        toggleActions: "play none none none"
      }
    }).to(mainLines, {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      stagger: 0.05,
      ease: "power3.out"
    });

gsap.to(".main-bg", {
  opacity: 1,
  scrollTrigger: {
    trigger: ".sc-main",
    start: "top top+=20",
    end: "top top+=600",
    scrub: true
  }
});

gsap.registerPlugin(ScrollTrigger);

  const mainBg = document.querySelector(".main-bg");

  gsap.to(mainBg, {
    opacity: 0,
    scrollTrigger: {
      trigger: ".sc-main",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });