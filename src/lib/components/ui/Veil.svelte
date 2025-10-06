<script>
    import { onMount, createEventDispatcher, onDestroy } from "svelte";
    const dispatch = createEventDispatcher();

    let showCurtain = true;
    let lifted = false; // drives .curtain.lift via Svelte class binding
    let audio;
    let animationStarted = false; // hides hint when animation begins

    // --- Confetti Logic ---
    let confettiPieces = [];
    const confettiCount = 150;

    function createConfetti() {
        const colors = ["#ffca3a", "#ff595e", "#8ac926", "#1982c4", "#6a4c93"];
        for (let i = 0; i < confettiCount; i++) {
            confettiPieces.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * -window.innerHeight,
                r: Math.random() * 6 + 3,
                d: Math.random() * 0.02 + 0.01,
                color: colors[Math.floor(Math.random() * colors.length)],
                tilt: Math.random() * 20 - 10,
            });
        }
    }

    let canvas, ctx;
    let animationFrame;

    function drawConfetti() {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confettiPieces.forEach((p) => {
            ctx.save();
            ctx.fillStyle = p.color;
            ctx.translate(p.x + p.r / 2, p.y + p.r / 2);
            ctx.rotate((p.tilt * Math.PI) / 180);
            ctx.fillRect(-p.r / 2, -p.r, p.r, p.r * 2);
            ctx.restore();
        });
        updateConfetti();
        animationFrame = requestAnimationFrame(drawConfetti);
    }

    function updateConfetti() {
        confettiPieces.forEach((p) => {
            p.tilt += 0.5;
            p.y += (Math.cos(p.d) + 1.5) * 1.5;
            p.x += Math.sin(p.d);
            if (p.y > canvas.height) {
                p.y = -20;
                p.x = Math.random() * canvas.width;
            }
        });
    }

    function startConfetti() {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx = canvas.getContext("2d");
        confettiPieces = [];
        createConfetti();
        drawConfetti();
    }

    function stopConfetti() {
        cancelAnimationFrame(animationFrame);
    }

    // --- Curtain and Interaction Logic ---
    function liftCurtain() {
        if (lifted) return;
        animationStarted = true;
        lifted = true; // this toggles the CSS selector .curtain.lift
        startConfetti();

        // Audio path: served from static/audio/Preview.wav as /audio/Preview.wav
        // audio = new Audio("/audio/Preview.wav");
        // audio.play().catch(() => {
        //     // user gesture usually required; click/space provides it
        // });

        // Dispatch end after animation completes
        setTimeout(() => {
            showCurtain = false;
            stopConfetti();
            dispatch("end");
        }, 4500);
    }

    function handleKeydown(event) {
        if (event.code === "Space") {
            event.preventDefault(); // prevent page scroll
            liftCurtain();
        }
    }

    onMount(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            dispatch("end");
            return;
        }
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeydown);
    });

    onDestroy(() => {
        document.body.style.overflow = "";
        stopConfetti();
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
        window.removeEventListener("keydown", handleKeydown);
    });
</script>

{#if showCurtain}
    <div
        class="veil"
        on:click={liftCurtain}
        on:touchstart|passive={liftCurtain}
    >
        <div class="curtain" class:lift={lifted}>
            <!-- The background of this div is the curtain image -->
        </div>

        {#if !animationStarted}
            <div class="hint">Press Space or Tap to Unveil</div>
        {/if}

        <canvas bind:this={canvas}></canvas>
    </div>
{/if}

<style>
    .veil {
        position: fixed;
        inset: 0;
        background: #111;
        z-index: 9999;
        overflow: hidden;
        font-family: "Garamond", "Times New Roman", serif;
    }

    /* Curtain panel that slides upward; it uses the image as its background */
    .curtain {
        position: absolute;
        width: 100%;
        height: 100%;
        transform-origin: top center;
        transition: transform 4.5s cubic-bezier(0.65, 0, 0.35, 1);
        background-image: url("/images/red-velvet-curtains.jpg");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        z-index: 1; /* below confetti and hint */
        pointer-events: none; /* ensure clicks reach the veil container */
    }

    .curtain.lift {
        transform: translateY(-100%);
    }

    .hint {
        position: absolute;
        bottom: 8%;
        left: 50%;
        transform: translateX(-50%);
        color: rgba(255, 255, 255, 0.9);
        background: rgba(0, 0, 0, 0.5);
        padding: 12px 25px;
        border-radius: 8px;
        font-size: 1.5rem;
        text-shadow: 0 0 8px rgba(0, 0, 0, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.2);
        animation: pulse 2.5s infinite;
        z-index: 3;
        pointer-events: none; /* overlay text; clicks bubble to veil */
    }

    @keyframes pulse {
        0%,
        100% {
            opacity: 1;
            transform: translateX(-50%) scale(1);
        }
        50% {
            opacity: 0.7;
            transform: translateX(-50%) scale(1.03);
        }
    }

    /* Confetti layer above the curtain so it falls over it */
    canvas {
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 2;
    }
</style>
