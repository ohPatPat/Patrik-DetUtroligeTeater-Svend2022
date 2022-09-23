import React, { useEffect } from "react";

export const Meta = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = props.title;
    if (props.description) {
      document
        .querySelector('meta[name="description"]')
        .setAttribute("content", props.description);
    }
	if (props.title) {
		document
		  .querySelector('meta[name="title"]')
		  .setAttribute("content", props.title);
	  }
  	if (props.title) {
		document
		  .querySelector('meta[property="og:title"]')
		  .setAttribute("content", props.title);
	  }

  }, [props.title, props.description]);

  const str = props.title;

// Replacing "&" to "" (empty space)
const NotFriendlyTitle = str.replaceAll("&", '')

// Replacing " " (space) to "" (empty space)
const FriendlyTitle = NotFriendlyTitle.replaceAll(/ /g, '')

  return (
	
    <main id={FriendlyTitle}>
		<h1>{props.title}</h1>
      {props.children}
    </main>
  );
};

