const carasoul = document.querySelector(".carasoul");
const carasoulButtons = document.querySelectorAll(".carasoul__btn");
const carasoulSlide = document.querySelector(".carasoul-slide");

const carasoulChildren = [...carasoul.children];
let isDragging = false,
	startX,
	startScrollLeft;

const slidePerView = Math.floor(
	carasoul.offsetWidth / carasoulSlide.offsetWidth
);

carasoulChildren
	.slice(-slidePerView)
	.reverse()
	.forEach((children) => {
		carasoul.insertAdjacentHTML("afterbegin", children.outerHTML);
	});

carasoulChildren.slice(0, slidePerView).forEach((children) => {
	carasoul.insertAdjacentHTML("beforeend", children.outerHTML);
});

const dragging = (e) => {
	if (!isDragging) {
		return;
	}

	// e.pageX - startX -> this gives the distance that we have moved. If I moved left, this distance will be increase towards negative. If I moved right this distance will increase towards positive.

	/* e.g: Suppose initial mouse position was 10px and startScrollLeft=0. Then I move the mouse to right by 10px. It means e.pageX will return 20px because initially i was at 10px and then I move 10px more. startX - e.pageX will give me -10px. If I add -10px to initial startScrollLeft, carasoul will move its content towards right by 10px because we are acutally reducing scrollLeft position. if we reduce scrollLeft content moves right and if we increase it content moves left. But what if I move my mouse by 10px towards left, e.pageX will give 0. Then startX - e.pageX will give me -10px. If I add -10px to startScrollLeft then carasoul will move its content by 10px right.
	 */

	carasoul.scrollLeft = startScrollLeft + (startX - e.pageX);
};

const startDragging = (e) => {
	isDragging = true;
	carasoul.classList.add("dragging");

	// on which position the mouse is clicked initially
	startX = e.pageX;
	// how many pixels the content of carasoul is scrolled initially
	startScrollLeft = carasoul.scrollLeft;
};

const stopDragging = (e) => {
	isDragging = false;
	carasoul.classList.remove("dragging");
};

carasoulButtons.forEach((button) => {
	button.addEventListener("click", () => {
		const carasoulSlideWidth = carasoulSlide.offsetWidth;
		const width = button.classList.contains("carasoul__prev--btn")
			? -carasoulSlideWidth
			: carasoulSlideWidth;

		carasoul.scrollLeft += width;
	});
});

const infinteScroll = (e) => {
	if (carasoul.scrollLeft === 0) {
		carasoul.classList.add("no-smoothness");
		carasoul.scrollLeft = carasoul.scrollWidth - 2 * carasoul.offsetWidth;
		carasoul.classList.remove("no-smoothness");
	} else if (
		Math.floor(carasoul.scrollLeft) ===
		carasoul.scrollWidth - carasoul.offsetWidth
	) {
		carasoul.classList.add("no-smoothness");
		carasoul.scrollLeft = carasoul.offsetWidth;
		carasoul.classList.remove("no-smoothness");
	}
};

carasoul.addEventListener("scroll", infinteScroll);
carasoul.addEventListener("mousemove", dragging);
carasoul.addEventListener("mousedown", startDragging);
carasoul.addEventListener("mouseup", stopDragging);
carasoul.addEventListener("mouseleave", stopDragging);
