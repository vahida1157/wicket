/**
 *
 */
module org.apache.wicket.objectsizeof.agent {
    requires java.instrument;
    requires org.slf4j;
    requires org.apache.wicket.core;

    exports org.apache.wicket.util.instrument;
}
