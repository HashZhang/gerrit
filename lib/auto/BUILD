java_plugin(
  name = 'auto-annotation-plugin',
  processor_class = 'com.google.auto.value.processor.AutoAnnotationProcessor',
  deps = ['@auto_value//jar'],
)

java_plugin(
  name = 'auto-value-plugin',
  processor_class = 'com.google.auto.value.processor.AutoValueProcessor',
  deps = ['@auto_value//jar'],
)

java_library(
  name = 'auto-value',
  exported_plugins = [
    ':auto-annotation-plugin',
    ':auto-value-plugin',
  ],
  exports = ['@auto_value//jar'],
  visibility = ['//visibility:public'],
  data = ['//lib:LICENSE-Apache2.0'],
)
