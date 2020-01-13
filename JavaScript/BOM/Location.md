[参考]:
https://developer.mozilla.org/zh-CN/docs/Web/API/Location

## Location
表示其链接到的对象的位置（URL）。


```
interface Location {
  /**
    * Returns a DOMStringList object listing the origins of the ancestor browsing contexts, from the parent browsing context to the top-level browsing context.
    */
  readonly ancestorOrigins: DOMStringList;
  /**
    * Returns the Location object's URL's fragment (includes leading "#" if non-empty).
    * 
    * Can be set, to navigate to the same URL with a changed fragment (ignores leading "#").
    */
  hash: string;
  /**
    * Returns the Location object's URL's host and port (if different from the default port for the scheme).
    * 
    * Can be set, to navigate to the same URL with a changed host and port.
    */
  host: string;
  /**
    * Returns the Location object's URL's host.
    * 
    * Can be set, to navigate to the same URL with a changed host.
    */
  hostname: string;
  /**
    * Returns the Location object's URL.
    * 
    * Can be set, to navigate to the given URL.
    */
  href: string;
  /**
    * Returns the Location object's URL's origin.
    */
  readonly origin: string;
  /**
    * Returns the Location object's URL's path.
    * 
    * Can be set, to navigate to the same URL with a changed path.
    */
  pathname: string;
  /**
    * Returns the Location object's URL's port.
    * 
    * Can be set, to navigate to the same URL with a changed port.
    */
  port: string;
  /**
    * Returns the Location object's URL's scheme.
    * 
    * Can be set, to navigate to the same URL with a changed scheme.
    */
  protocol: string;
  /**
    * Returns the Location object's URL's query (includes leading "?" if non-empty).
    * 
    * Can be set, to navigate to the same URL with a changed query (ignores leading "?").
    */
  search: string;
  /**
    * Navigates to the given URL.
    */
  assign(url: string): void;
  /**
    * Reloads the current page.
    */
  reload(): void;
  /** @deprecated */
  reload(forcedReload: boolean): void;
  /**
    * Removes the current page from the session history and navigates to the given URL.
    */
  replace(url: string): void;
}
```