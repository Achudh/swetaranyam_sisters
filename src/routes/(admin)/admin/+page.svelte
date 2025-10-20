<script lang="ts">
  import { auth } from "$lib/stores/auth";
  import type { ContactEnquiry, ContactSubmissionsResponse } from "$lib/types";
  import type { GraphQLResponse } from "@nhost/nhost-js/graphql";
  import { onMount } from "svelte";

  let contactEnquireies: ContactEnquiry[] = [];
  let selected: ContactEnquiry | null = null;

  let isMobileView = false;
  let _mql: MediaQueryList | null = null;

  onMount(async () => {
    try {
      const getContactEnquiries = `
        query getContactEnquiries {
          contact_submissions {
            id
            created_at
            name
            email
            organization
            phone
            message
          }
        }
      `;

      const response = await $auth.nhost.graphql.request({
        query: getContactEnquiries,
      });

      // normalize runtime shape the SDK returns
      const body = (response as any).body ?? (response as any);
      const result = body as GraphQLResponse<ContactSubmissionsResponse>;

      if (result.errors && result.errors.length) {
        console.error("GraphQL errors:", result.errors);
        return;
      }

      contactEnquireies = result.data?.contact_submissions ?? [];
    } catch (err) {
      console.error("GraphQL/read error:", err);
    }

    // mobile detection + live updates
    if (typeof window !== "undefined") {
      _mql = window.matchMedia("(max-width: 767px)");
      const onChange = (e: MediaQueryListEvent | MediaQueryList) => {
        // MediaQueryListEvent in newer browsers, MediaQueryList in older APIs
        // both expose .matches
        isMobileView = "matches" in e ? e.matches : _mql ? _mql.matches : false;
      };
      onChange(_mql);
      // add listener (handle both addEventListener and deprecated addListener)
      if (_mql.addEventListener) {
        _mql.addEventListener("change", onChange as EventListener);
      } else {
        _mql.addListener(onChange as any);
      }
    }
  });

  // cleanup optional - runs when component destroyed
  // (Svelte's onMount may return a cleanup function if needed)
  // Not strictly necessary here, but good practice:
  // onDestroy(() => {
  //   if (_mql) {
  //     _mql.removeEventListener ? _mql.removeEventListener("change", onChange) : _mql.removeListener(onChange);
  //   }
  // });

  function selectEntry(entry: ContactEnquiry) {
    if (isMobileView) {
      // toggle expand on mobile (no separate canvas)
      selected = selected?.id === entry.id ? null : entry;
      // keep list only — no canvas to show
      return;
    }

    selected = entry;
    // desktop: scroll the canvas area into view so user sees details immediately
    requestAnimationFrame(() => {
      document
        .querySelector(".canvas-area")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function clearSelection() {
    selected = null;
    // on mobile bring list back into view
    if (isMobileView) {
      requestAnimationFrame(() => {
        document
          .querySelector(".pages")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }

  function formatDate(ts: string) {
    try {
      return new Date(ts).toLocaleString();
    } catch {
      return ts;
    }
  }
</script>

<svelte:head>
  <title>Admin | Swetaranyam Sisters</title>
  <meta
    name="description"
    content="Prof. Dr. R Nithya & Prof. Dr. R Vidya - acclaimed Carnatic vocalists with over 25 years of concerts, teaching, and research across India and internationally."
  />
</svelte:head>
<div class="dashboard">
  <section class="pages">
    {#if !isMobileView}
      <h2 class="text-gold-500">Contact submissions</h2>
      <br />
    {/if}
    <ul class="submissions-list">
      {#each contactEnquireies as a (a.id)}
        <li class:selected={selected?.id === a.id}>
          <button
            type="button"
            class="entry-toggle"
            on:click={() => selectEntry(a)}
            aria-pressed={selected?.id === a.id}
          >
            <div class="row">
              <div class="name">{a.name}</div>
              <div class="created">{formatDate(a.created_at)}</div>
            </div>

            <!-- show compact meta on desktop, full card details on mobile or when item is selected -->
            <div class="meta">{a.email}</div>
          </button>

          {#if isMobileView || selected?.id === a.id}
            <div class="card-details">
              <dl>
                <div class="field">
                  <dt>Email</dt>
                  <dd><a href={"mailto:" + a.email}>{a.email}</a></dd>
                </div>

                {#if a.organization}
                  <div class="field">
                    <dt>Organization</dt>
                    <dd>{a.organization}</dd>
                  </div>
                {/if}

                {#if a.phone}
                  <div class="field">
                    <dt>Phone</dt>
                    <dd><a href={"tel:" + a.phone}>{a.phone}</a></dd>
                  </div>
                {/if}

                <div class="field">
                  <dt>Message</dt>
                  <dd class="message">{a.message}</dd>
                </div>
              </dl>
            </div>
          {/if}
        </li>
      {/each}
    </ul>
  </section>

  {#if !isMobileView}
    <section class="canvas-area">
      {#if selected}
        <div class="contact-details">
          <div class="header">
            <button class="clear" on:click={clearSelection} aria-label="Close"
              >✕</button
            >
          </div>
          <div class="grid grid-cols-2 gap-2">
            <dl>
              <h3>Name: {selected.name}</h3>
              <dt>Received at</dt>
              <dt>Email</dt>
              {#if selected.organization}
                <dt>Organization</dt>
              {/if}

              {#if selected.phone}
                <dt>Phone</dt>
              {/if}

              <dt>Message</dt>
            </dl>
            <div>
              <p>{formatDate(selected.created_at)}</p>
              <a href={"mailto:" + selected.email}>{selected.email}</a>
              {#if selected.organization}
                <p>{selected.organization}</p>
              {/if}

              {#if selected.phone}
                <a href={"tel:" + selected.phone}>{selected.phone}</a>
              {/if}
              <p class="message">{selected.message}</p>
            </div>
          </div>
        </div>
      {:else}
        <div class="placeholder-canvas">
          Select a submission on the left to view details
        </div>
      {/if}
    </section>
  {/if}
</div>

<style>
  /* Mobile-first layout */
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.75rem;
    padding: 0.75rem;
  }

  .pages {
    border: 1px solid rgba(255, 255, 255, 0.06);
    padding: 0.75rem;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 8px;
  }

  .submissions-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-height: 62vh;
    overflow: auto;
  }

  /* Mobile: each list item is a card containing all fields */
  .submissions-list li {
    display: block;
    padding: 0.9rem;
    border-radius: 10px;
    cursor: pointer;
    border: 1px solid rgba(255, 255, 255, 0.04);
    background: rgba(0, 0, 0, 0.06);
    transition:
      transform 0.08s ease,
      box-shadow 0.08s ease,
      border-color 0.12s;
    touch-action: manipulation;
  }

  .entry-toggle {
    all: unset;
    display: block;
    width: 100%;
    text-align: left;
    cursor: pointer;
    /* keep button contents laying out the same as the li did */
  }

  .submissions-list li:hover,
  .submissions-list li:focus {
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
    border-color: rgba(255, 255, 255, 0.08);
    outline: none;
  }

  .row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 0.5rem;
  }

  .submissions-list .name {
    font-weight: 700;
    font-size: 1.02rem;
    color: #fff;
  }

  .created {
    font-size: 0.82rem;
    color: #d1d5db;
  }

  .submissions-list .meta {
    display: none; /* hide compact meta on mobile, show on desktop */
    margin-top: 0.25rem;
    font-size: 0.9rem;
    color: #e6e6e6;
  }

  .card-details {
    margin-top: 0.6rem;
    border-top: 1px solid rgba(255, 255, 255, 0.03);
    padding-top: 0.6rem;
  }

  .card-details dl {
    margin: 0;
    display: grid;
    gap: 0.35rem 0.6rem;
  }
  .card-details dt {
    font-weight: 600;
    color: #e6e6e6;
    font-size: 0.88rem;
  }
  .card-details dd {
    margin: 0;
    color: #fff;
    font-size: 0.95rem;
    word-break: break-word;
  }

  .message {
    white-space: pre-wrap;
    color: #f3f4f6;
  }

  .submissions-list li.selected {
    border-color: rgba(99, 102, 241, 0.28);
    box-shadow: 0 10px 30px rgba(99, 102, 241, 0.06);
    background: linear-gradient(
      180deg,
      rgba(99, 102, 241, 0.04),
      rgba(0, 0, 0, 0.1)
    );
  }

  /* Larger screens: two-column layout */
  @media (min-width: 768px) {
    .dashboard {
      grid-template-columns: 320px 1fr;
      gap: 1rem;
      padding: 1rem;
    }

    .pages {
      max-height: calc(100vh - 2rem);
      overflow: auto;
      padding: 1rem;
    }

    .submissions-list {
      max-height: calc(100vh - 4rem);
      gap: 0.5rem;
    }

    /* Compact row style for desktop: hide card-details and show meta */
    .submissions-list li {
      padding: 0.6rem 0.75rem;
      display: flex;
      flex-direction: column;
      background: transparent;
      border: 1px solid transparent;
      box-shadow: none;
    }

    .submissions-list .meta {
      display: block;
      color: #e6e6e6;
      margin-top: 0.25rem;
      font-size: 0.86rem;
      word-break: normal;
    }

    .card-details {
      display: none;
    }

    .canvas-area {
      min-height: 90vh;
      padding: 1rem;
    }
  }
</style>
